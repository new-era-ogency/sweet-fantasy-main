import { IsEmail, IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsDateString()
  @IsNotEmpty()
  deliveryDate: string; // Дата, на когда нужен торт

  @IsNumber()
  @IsNotEmpty()
  weightInKg: number;   // Вес торта (например, 2 или 3.5)

  @IsString()
  @IsNotEmpty()
  filling: string;      // Выбранная начинка (например, "Шоколадно-вишневый")

  @IsString()
  @IsOptional()
  designComment?: string; // Пожелания к оформлению/надписи
}
