# Cinematic Landing Page - Backend API

A robust Node.js + Express backend for the Cinematic Landing Page with contact forms, newsletter subscriptions, and project inquiries.

## Features

- ✉️ **Contact Form API** - Handle contact submissions with email notifications
- 📧 **Newsletter Management** - Subscribe/unsubscribe functionality
- 🎨 **Project Inquiries** - Detailed project request forms
- 💾 **SQLite Database** - Lightweight data storage
- 🔒 **Security** - Helmet, CORS, and rate limiting
- ✅ **Validation** - Input validation with express-validator
- 📨 **Email Integration** - Nodemailer for automated emails

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

**For Gmail:**
1. Enable 2-factor authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `EMAIL_PASSWORD`

### 3. Initialize Database

```bash
npm run init-db
```

### 4. Start Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /api/health
```

### Contact Form
```
POST /api/contact
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc", // optional
  "message": "I'd like to discuss a project"
}
```

### Newsletter
```
POST /api/newsletter/subscribe
Body: { "email": "user@example.com" }

POST /api/newsletter/unsubscribe
Body: { "email": "user@example.com" }

GET /api/newsletter/subscribers
```

### Project Inquiries
```
POST /api/projects/inquiry
Body: {
  "name": "Jane Smith",
  "email": "jane@example.com",
  "company": "Tech Corp", // optional
  "project_type": "Web Design", // optional
  "budget_range": "$10k-$25k", // optional
  "timeline": "2-3 months", // optional
  "description": "We need a new website"
}

GET /api/projects/inquiries
GET /api/projects/stats
```

## Database Schema

### contact_submissions
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT)
- company (TEXT, nullable)
- message (TEXT)
- created_at (DATETIME)

### newsletter_subscriptions
- id (INTEGER PRIMARY KEY)
- email (TEXT UNIQUE)
- subscribed_at (DATETIME)
- is_active (BOOLEAN)

### project_inquiries
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT)
- company (TEXT, nullable)
- project_type (TEXT, nullable)
- budget_range (TEXT, nullable)
- timeline (TEXT, nullable)
- description (TEXT)
- created_at (DATETIME)

## Security Features

- **Helmet** - Sets security HTTP headers
- **CORS** - Configured for frontend origin
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - All inputs validated and sanitized
- **SQL Injection Protection** - Prepared statements

## Email Templates

All emails are sent as HTML with professional styling:
- Contact form notifications to admin
- Project inquiry notifications to admin
- Welcome emails to newsletter subscribers

## Troubleshooting

### Email not sending?
1. Check your email credentials in `.env`
2. For Gmail, ensure you're using an App Password
3. Check the console for error messages
4. Verify EMAIL_HOST and EMAIL_PORT are correct

### Database errors?
1. Run `npm run init-db` to reinitialize
2. Check `database/` directory exists
3. Ensure write permissions

### CORS errors?
1. Verify `FRONTEND_URL` in `.env` matches your frontend
2. Check browser console for specific CORS errors

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name cinematic-backend
   ```
3. Consider upgrading to PostgreSQL for production
4. Add authentication for admin endpoints
5. Use a reverse proxy (nginx) for SSL/HTTPS

## Future Enhancements

- [ ] Admin authentication (JWT)
- [ ] File upload support for project briefs
- [ ] PostgreSQL migration
- [ ] Email templates customization
- [ ] Analytics dashboard
- [ ] Webhook integrations

## License

MIT
