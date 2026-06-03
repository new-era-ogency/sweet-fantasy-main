<?php

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::post('/booking', function (Request $request) {
    $data = $request->validate([
        'customerName' => ['required', 'string'],
        'customerEmail' => ['required', 'email'],
        'deliveryDate' => ['required', 'date'],
        'weightInKg' => ['required', 'numeric'],
        'filling' => ['required', 'string'],
        'designComment' => ['nullable', 'string'],
    ]);

    $adminEmail = env('ADMIN_EMAIL');

    if (!$adminEmail) {
        return response()->json([
            'success' => false,
            'message' => 'ADMIN_EMAIL is not configured',
        ], 500);
    }

    $customerName = e($data['customerName']);
    $customerEmail = e($data['customerEmail']);
    $filling = e($data['filling']);
    $weightInKg = e((string) $data['weightInKg']);
    $deliveryDate = Carbon::parse($data['deliveryDate'])->format('d.m.Y');
    $designComment = !empty($data['designComment'])
        ? e($data['designComment'])
        : 'Нет комментариев';

    $html = <<<HTML
<!doctype html>
<html lang="ru">
<body style="margin:0;padding:0;background:#fff7ed;font-family:Arial,sans-serif;color:#422006;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff7ed;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #fed7aa;box-shadow:0 10px 30px rgba(154,52,18,0.12);">
          <tr>
            <td style="background:#fb923c;color:#ffffff;padding:24px 28px;">
              <h2 style="margin:0;font-size:24px;line-height:1.3;">Новая бронь на сайте</h2>
              <p style="margin:8px 0 0;font-size:15px;">Новый заказ торта от {$customerName}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 18px;font-size:16px;">Поступила новая заявка на бронирование торта Sweet Fantasy.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #fed7aa;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="width:42%;padding:14px 16px;background:#ffedd5;border-bottom:1px solid #fed7aa;font-weight:700;">Клиент</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #fed7aa;">{$customerName}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#fff7ed;border-bottom:1px solid #fed7aa;font-weight:700;">Email для связи</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #fed7aa;"><a href="mailto:{$customerEmail}" style="color:#c2410c;">{$customerEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#ffedd5;border-bottom:1px solid #fed7aa;font-weight:700;">Дата готовности</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #fed7aa;">{$deliveryDate}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#fff7ed;border-bottom:1px solid #fed7aa;font-weight:700;">Начинка</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #fed7aa;">{$filling}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#ffedd5;border-bottom:1px solid #fed7aa;font-weight:700;">Вес</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #fed7aa;">{$weightInKg} кг</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#fff7ed;font-weight:700;">Комментарий к дизайну</td>
                  <td style="padding:14px 16px;">{$designComment}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

    Mail::html($html, function ($message) use ($adminEmail, $data) {
        $message
            ->to($adminEmail)
            ->subject('Новый заказ торта от ' . $data['customerName']);
    });

    return response()->json([
        'success' => true,
        'message' => 'Бронирование успешно оформлено',
    ]);
});
