import dotenv from 'dotenv';
import { verifyEmailConnection, sendContactEmail } from '../config/email.js';

dotenv.config();

console.log('🔍 Testing Email Configuration...\n');

// Display current configuration (hiding password)
console.log('Current Email Settings:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`EMAIL_HOST: ${process.env.EMAIL_HOST}`);
console.log(`EMAIL_PORT: ${process.env.EMAIL_PORT}`);
console.log(`EMAIL_SECURE: ${process.env.EMAIL_SECURE}`);
console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
console.log(`EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? '***' + process.env.EMAIL_PASSWORD.slice(-4) : 'NOT SET'}`);
console.log(`ADMIN_EMAIL: ${process.env.ADMIN_EMAIL}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Check if credentials are set
if (process.env.EMAIL_USER === 'your-email@gmail.com' ||
    process.env.EMAIL_PASSWORD === 'your-app-specific-password') {
    console.log('⚠️  WARNING: Email credentials are still using placeholder values!');
    console.log('Please update your .env file with actual credentials.\n');
    console.log('For Gmail:');
    console.log('1. Go to: https://myaccount.google.com/apppasswords');
    console.log('2. Generate an App Password (16 characters)');
    console.log('3. Update EMAIL_USER and EMAIL_PASSWORD in .env');
    console.log('4. Restart the server\n');
    process.exit(1);
}

// Test connection
console.log('Testing SMTP connection...');
const connectionOk = await verifyEmailConnection();

if (!connectionOk) {
    console.log('\n❌ Email connection failed!');
    console.log('Please check your credentials and try again.\n');
    process.exit(1);
}

// Send test email
console.log('\n📧 Sending test email...');
try {
    await sendContactEmail({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'This is a test email to verify the email configuration is working correctly.'
    });

    console.log('\n✅ Test email sent successfully!');
    console.log(`Check your inbox at: ${process.env.ADMIN_EMAIL}\n`);
} catch (error) {
    console.log('\n❌ Failed to send test email!');
    console.log('Error:', error.message);
    console.log('\nCommon issues:');
    console.log('- Wrong email/password');
    console.log('- 2FA not enabled (required for Gmail)');
    console.log('- Using regular password instead of App Password');
    console.log('- Less secure app access disabled\n');
    process.exit(1);
}
