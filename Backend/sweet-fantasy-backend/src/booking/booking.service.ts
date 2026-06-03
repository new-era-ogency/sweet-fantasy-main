import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';
import { CreateBookingDto } from './dto/create-booking.dto';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(value: string | undefined) {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value || '');
}

@Injectable()
export class BookingService {
  private readonly mailService = new MailService();

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');

    if (apiKey) {
      this.mailService.setApiKey(apiKey);
    }
  }

  async createBooking(dto: CreateBookingDto) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const fromEmail = this.configService.get<string>('SENDGRID_FROM_EMAIL');

    if (!apiKey || !fromEmail || !adminEmail) {
      throw new InternalServerErrorException('Email configuration is missing');
    }

    if (!isValidEmail(fromEmail) || !isValidEmail(adminEmail)) {
      throw new InternalServerErrorException('Email configuration is invalid');
    }

    const customerName = escapeHtml(dto.customerName);
    const customerEmail = escapeHtml(dto.customerEmail);
    const filling = escapeHtml(dto.filling);
    const deliveryDate = new Date(dto.deliveryDate).toLocaleDateString('ru-RU');
    const designComment = dto.designComment
      ? escapeHtml(dto.designComment)
      : 'Нет комментариев';

    const clientMsg = {
      to: dto.customerEmail,
      from: fromEmail,
      subject: 'Ваш заказ торта принят! | Sweet Fantasy',
      html: `
        <h1>Здравствуйте, ${customerName}!</h1>
        <p>Мы получили Вашу заявку на бронирование торта.</p>
        <ul>
          <li><strong>Начинка:</strong> ${filling}</li>
          <li><strong>Вес:</strong> ${dto.weightInKg} кг</li>
          <li><strong>Дата готовности:</strong> ${deliveryDate}</li>
        </ul>
        <p>Скоро мы свяжемся с Вами для подтверждения деталей дизайна.</p>
      `,
    };

    const adminMsg = {
      to: adminEmail,
      from: fromEmail,
      subject: `Новый заказ торта от ${dto.customerName}`,
      html: `
        <h2>Новая бронь на сайте</h2>
        <p><strong>Клиент:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Дата готовности:</strong> ${deliveryDate}</p>
        <p><strong>Детали изделия:</strong></p>
        <ul>
          <li><strong>Начинка:</strong> ${filling}</li>
          <li><strong>Вес:</strong> ${dto.weightInKg} кг</li>
          <li><strong>Комментарий к дизайну:</strong> ${designComment}</li>
        </ul>
      `,
    };

    try {
      await Promise.all([
        this.mailService.send(clientMsg),
        this.mailService.send(adminMsg),
      ]);
      return { success: true, message: 'Бронирование успешно оформлено' };
    } catch (error) {
      console.error(error.response?.body || error);
      throw new InternalServerErrorException(
        'Ошибка при отправке уведомления о бронировании',
      );
    }
  }
}
