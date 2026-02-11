import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Verify connection configuration
export async function verifyEmailConnection() {
    try {
        await transporter.verify();
        console.log('✅ Email server is ready to send messages');
        return true;
    } catch (error) {
        console.error('❌ Email server connection failed:', error.message);
        return false;
    }
}

// Send contact form email
export async function sendContactEmail(data) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #9e1b32;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Submitted at: ${new Date().toLocaleString()}
        </p>
      </div>
    `,
    };

    return await transporter.sendMail(mailOptions);
}

// Send project inquiry email
export async function sendProjectInquiryEmail(data) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Project Inquiry from ${data.name}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #9e1b32;">New Project Inquiry</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.project_type ? `<p><strong>Project Type:</strong> ${data.project_type}</p>` : ''}
          ${data.budget_range ? `<p><strong>Budget Range:</strong> ${data.budget_range}</p>` : ''}
          ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
          <p><strong>Description:</strong></p>
          <p style="white-space: pre-wrap;">${data.description}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Submitted at: ${new Date().toLocaleString()}
        </p>
      </div>
    `,
    };

    return await transporter.sendMail(mailOptions);
}

// Send welcome email to newsletter subscriber
export async function sendWelcomeEmail(email) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Brandrush Newsletter',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #9e1b32;">Welcome to Brandrush!</h2>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll receive updates about our latest projects, design insights, and exclusive content.</p>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          If you didn't subscribe to this newsletter, please ignore this email.
        </p>
      </div>
    `,
    };

    return await transporter.sendMail(mailOptions);
}

export default transporter;
