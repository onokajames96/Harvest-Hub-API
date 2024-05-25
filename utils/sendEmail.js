const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	const mailOptions = {
		from: 'harvesthub2004@gmail.com',
		to: options.to,
		subject: options.subject,
		text: options.text
	};

	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
