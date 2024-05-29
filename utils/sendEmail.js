const nodemailer = require('nodemailer');

require('dotenv').config(); // Ensure environment variables are loaded

const sendEmail = async (options) => {
	try{
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
	}catch (error) {
		console.error('Error sending email:', error);
	}
};

module.exports = sendEmail;
