import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'scaleaway',
    host: 'smtp.tem.scaleway.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SCW_DEFAULT_PROJECT_ID,
        pass: process.env.SCW_SECRET_KEY,
    },
});

export const sendEmail = async (to: string, subject: string, htmlContent: string, textContent?: string) => {
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: to,
            subject: subject,
            html: htmlContent,
            text: textContent,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return {success: true, message: 'Email sent successfully!'};
    } catch (error) {
        console.error('Error sending email:', error);
        return {success: false, message: 'Failed to send email.'};
    }
};

(async () => {
    const resp = await sendEmail("daniel.markow@gmail.com", "hello world", "<p>this is a test</p>", "text content")
    console.log(resp)
})();

