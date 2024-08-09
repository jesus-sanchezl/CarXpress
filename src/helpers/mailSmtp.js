const nodemailer = require("nodemailer");

const { HTTP_BACKEND, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } =
    process.env;

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

const sendMailRegister = async (name, email, code) => {
    const linkActivation = `${HTTP_BACKEND}/api/v1/activation?code=${code}`;
    console.log("linkActivation>>", linkActivation);

    const mailData = {
        from: SMTP_FROM,
        to: email,
        subject: "Welcome to ReviewCars App",
        text: `Hi ${name}, to confirm the account go this link: ${linkActivation}`,
        html: `Hi ${name}, to confirm the account <a href='${linkActivation}'>active it here </a>`,
    };

    const data = await transporter.sendMail(mailData);

    return true;
};

const sendMailCorrectActivation = async (name, email) => {
    const mailData = {
        from: SMTP_FROM,
        to: email,
        subject: "Account activated!",
        text: `Hi ${name}, your account was activated!. Enjoy the app!`,
        html: `<h1>Hi ${name},</h1><p>your account was activated!. Enjoy the app!</p>`,
    };

    const data = await transporter.sendMail(mailData);
    console.log("data", data);

    return true;
};

module.exports = {
    sendMailCorrectActivation,
    sendMailRegister,
};
