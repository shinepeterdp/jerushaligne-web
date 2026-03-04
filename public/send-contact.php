<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name    = htmlspecialchars($_POST["name"]);
    $phone   = htmlspecialchars($_POST["phone"]);
    $email   = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    try {

        /* ================= ADMIN EMAIL ================= */

        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'shinepeterdp@gmail.com';
        $mail->Password   = 'csoi gbfr xraq uhqy';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('shinepeterdp@gmail.com', 'Jerush Aligners');
        $mail->addAddress('shinepeterdp@gmail.com');

        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = 'New Contact Details From Jerushaligne Website';

        $mail->Body = "
        <h2>New Patient Details from Jerushaligne Contact Form</h2>

        <p><strong>Name:</strong> $name</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Email:</strong> $email</p>

        <p><strong>Message:</strong></p>
        <p>$message</p>
        ";

        $mail->send();


        /* ================= AUTO REPLY EMAIL ================= */

        $autoReply = new PHPMailer(true);

        $autoReply->isSMTP();
        $autoReply->Host       = 'smtp.gmail.com';
        $autoReply->SMTPAuth   = true;
        $autoReply->Username   = 'shinepeterdp@gmail.com';
        $autoReply->Password   = 'csoi gbfr xraq uhqy';
        $autoReply->SMTPSecure = 'tls';
        $autoReply->Port       = 587;
        
        
        $autoReply->setFrom('shinepeterdp@gmail.com', 'Jerushaligne');
        $autoReply->addAddress($email, $name);

        $autoReply->isHTML(true);
        $autoReply->Subject = "Thank you for contacting Jerush Aligners";

        $autoReply->Body = '
<div style="font-family:Arial,Helvetica,sans-serif;background:#f5f5f5;padding:30px">


  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden">

    <!-- HEADER -->
    <tr>
      <td style="background:linear-gradient(to right,#f59e0b,#fbbf24);padding:25px;text-align:center">
        <img src="https://dev.jerushaligne.com/images/logo/jerushaligne-logo.png" 
        alt="Jerush Aligners" style="height:60px;">
      </td>
    </tr>

    <!-- CONTENT -->
    <tr>
      <td style="padding:30px;color:#333">

        <h2 style="margin-top:0">Hello '.$name.' 👋</h2>

        <p>
        Thank you for contacting <strong>Jerushaligne</strong>.
        </p>

        <p>
        Your enquiry has been received successfully.  
        Our assistant will review your message and get in touch with you shortly.
        </p>

        <br>

        <p><strong>Your submitted details:</strong></p>

        <p>
        Name: '.$name.' <br>
        Phone: '.$phone.' <br>
        Email: '.$email.' <br>

        </p>

        <br>

        <p>
        Warm regards,<br>
        <strong>Jerushaligne, <br>Thuckalay | Trichy | Chennai | Dubai </strong>
        </p>

      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background:#f3f3f3;padding:20px;text-align:center;font-size:13px;color:#666">

        Jerushaligne<br>
        German-UK Technology | India<br><br>

        © '.date("Y").' Jerushaligne. All rights reserved.

      </td>
    </tr>

  </table>

</div>
';

        $autoReply->send();

        echo "success";

    } catch (Exception $e) {

        echo "error";

    }

}
?>