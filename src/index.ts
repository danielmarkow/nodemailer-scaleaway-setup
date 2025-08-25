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

type EmailOptions = {
    from: string;
    to: string;
    subject: string;
    html: string;
};

export const sendEmail = async (mailOptions: EmailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return {success: true, message: 'Email sent successfully!'};
    } catch (error) {
        console.error('Error sending email:', error);
        return {success: false, message: 'Failed to send email.'};
    }
};

(async () => {
    const emailOptions: EmailOptions = {
        from: process.env.SENDER_EMAIL!,
        to: "target@email.com",
        subject: "hello world",
        html: "<p>this is a test</p>",
    }
    const resp = await sendEmail(emailOptions)
    console.log(resp)
})();

