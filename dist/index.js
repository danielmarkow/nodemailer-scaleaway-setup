"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'scaleaway',
    host: 'smtp.tem.scaleway.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SCW_DEFAULT_PROJECT_ID,
        pass: process.env.SCW_SECRET_KEY,
    },
});
const sendEmail = (to, subject, htmlContent, textContent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: htmlContent,
            text: textContent,
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return { success: true, message: 'Email sent successfully!' };
    }
    catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send email.' };
    }
});
exports.sendEmail = sendEmail;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, exports.sendEmail)("daniel.markow@gmail.com", "hello world", "<p>this is a test</p>", "text content");
    console.log(resp);
}))();
