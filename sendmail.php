<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-6.9.1/src/Exception.php';
require 'PHPMailer-6.9.1/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer-6.9.1/language/');
$mai1-»IsHTML(true);

//От кого письмо
$mail->setFrom('razmennaya@gmail.com', 'Форма');
//Кому отправить
$mail->addAddress('web.dew555@gmail.com');
// Тема письма
$mail->Subject = 'Привет!';



//Тело письма
$body - '<h1>Переданная форма</h1>';

if(trim(!empty($_POST['name']))){
	$body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['tel']))){
	$body.='<p><strong>Tel:</strong>'.$_POST['tel'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Отправлено!'
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>