const { Resend } = require('resend');

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(value) {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(String(value || ''));
}

function sendJson(res, statusCode, payload) {
  res.setHeader('Content-Type', 'application/json');
  res.status(statusCode).json(payload);
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { success: false, message: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const toEmail = process.env.TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    sendJson(res, 500, {
      success: false,
      error: 'Email configuration is missing',
      message: 'Email configuration is missing',
    });
    return;
  }

  if (!isValidEmail(fromEmail) || !isValidEmail(toEmail)) {
    sendJson(res, 500, {
      success: false,
      error: 'Email configuration is invalid',
      message: 'Email configuration is invalid',
    });
    return;
  }

  let data;
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  } catch (error) {
    sendJson(res, 400, {
      success: false,
      error: 'Invalid JSON body',
      message: 'Invalid JSON body',
    });
    return;
  }

  const weight = Number(data.weightInKg);
  const deliveryDateValue = new Date(data.deliveryDate);

  if (
    !data.customerName ||
    !isValidEmail(data.customerEmail) ||
    !data.deliveryDate ||
    Number.isNaN(deliveryDateValue.getTime()) ||
    !Number.isFinite(weight) ||
    weight <= 0 ||
    !data.filling
  ) {
    sendJson(res, 400, {
      success: false,
      error: 'Invalid booking payload',
      message: 'Invalid booking payload',
    });
    return;
  }

  const resend = new Resend(apiKey);

  const customerName = escapeHtml(data.customerName);
  const customerEmail = escapeHtml(data.customerEmail);
  const filling = escapeHtml(data.filling);
  const deliveryDate = deliveryDateValue.toLocaleDateString('ru-RU');
  const designComment = data.designComment ? escapeHtml(data.designComment) : 'Нет комментариев';

  const adminHtml = `
    <h2>Новая бронь на сайте</h2>
    <p><strong>Клиент:</strong> ${customerName} (${customerEmail})</p>
    <p><strong>Дата готовности:</strong> ${deliveryDate}</p>
    <p><strong>Детали изделия:</strong></p>
    <ul>
      <li><strong>Начинка:</strong> ${filling}</li>
      <li><strong>Вес:</strong> ${weight} кг</li>
      <li><strong>Комментарий к дизайну:</strong> ${designComment}</li>
    </ul>
  `;

  const customerHtml = `
    <h1>Здравствуйте, ${customerName}!</h1>
    <p>Мы получили Вашу заявку на бронирование торта.</p>
    <ul>
      <li><strong>Начинка:</strong> ${filling}</li>
      <li><strong>Вес:</strong> ${weight} кг</li>
      <li><strong>Дата готовности:</strong> ${deliveryDate}</li>
    </ul>
    <p>Скоро мы свяжемся с Вами для подтверждения деталей дизайна.</p>
  `;

  try {
    const [adminResult, customerResult] = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: toEmail,
        reply_to: data.customerEmail,
        subject: `Новый заказ торта от ${data.customerName}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: fromEmail,
        to: data.customerEmail,
        subject: 'Ваш заказ торта принят! | Sweet Fantasy',
        html: customerHtml,
      }),
    ]);

    const sendError = adminResult.error || customerResult.error;
    if (sendError) {
      throw sendError;
    }

    sendJson(res, 200, { success: true, message: 'Бронирование успешно оформлено' });
  } catch (error) {
    console.error('Booking email failed', {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
    });
    sendJson(res, 500, {
      success: false,
      error: 'Booking email failed',
      message: error.message || 'Booking email failed',
    });
  }
};
