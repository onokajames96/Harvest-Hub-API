const nodemailer = require('nodemailer');

require('dotenv').config(); // Ensure environment variables are loaded

/**
 * Sends an email using Nodemailer and Gmail SMTP.
 *
 * @param {Object} options - Email options.
 * @param {string} options.to - Recipient email address.
 * @param {string} options.subject - Subject of the email.
 * @param {string} options.text - Text content of the email.
 *
 * @throws Will throw an error if email sending fails.
 */

const sendEmail = async (options) => {
	try{
		// Create a transporter object using Gmail SMTP
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USERNAME, // Gmail email address from environment variables
				pass: process.env.EMAIL_PASSWORD  // Gmail email password from environment variables
			}
		});

		// Define email options
		const mailOptions = {
			from: 'harvesthub2004@gmail.com', // Sender address
			to: options.to, // Recipient address
			subject: options.subject, // Subject of the email
			text: options.text// Plain text content of the email
		};

		// Send email
		await transporter.sendMail(mailOptions);
	}catch (error) {
		console.error('Error sending email:', error);
		throw error; // Rethrow error after logging it
	}
};

module.exports = sendEmail;
