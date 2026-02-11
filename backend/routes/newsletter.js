import express from 'express';
import { body, validationResult } from 'express-validator';
import { dbHelpers } from '../config/database.js';
import { sendWelcomeEmail } from '../config/email.js';

const router = express.Router();

// Validation rules
const newsletterValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
];

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', newsletterValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const result = await dbHelpers.addNewsletterSubscription(email);

        if (result.exists) {
            return res.status(400).json({
                success: false,
                message: 'This email is already subscribed to our newsletter.'
            });
        }

        if (result.reactivated) {
            sendWelcomeEmail(email).catch(err => console.error('Welcome email failed:', err));
            return res.json({
                success: true,
                message: 'Welcome back! Your subscription has been reactivated.'
            });
        }

        // New subscription
        sendWelcomeEmail(email).catch(err => console.error('Welcome email failed:', err));

        res.status(201).json({
            success: true,
            message: 'Successfully subscribed to the newsletter!',
            id: result.subscription.id
        });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to subscribe. Please try again later.'
        });
    }
});

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', newsletterValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const result = await dbHelpers.unsubscribeNewsletter(email);

        if (!result.found) {
            return res.status(404).json({
                success: false,
                message: 'Email not found in our subscription list.'
            });
        }

        res.json({
            success: true,
            message: 'Successfully unsubscribed from the newsletter.'
        });
    } catch (error) {
        console.error('Newsletter unsubscribe error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to unsubscribe. Please try again later.'
        });
    }
});

// GET /api/newsletter/subscribers - Get all active subscribers (admin only)
router.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await dbHelpers.getActiveSubscribers();
        res.json({ success: true, count: subscribers.length, data: subscribers });
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch subscribers' });
    }
});

export default router;
