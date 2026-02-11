import express from 'express';
import { body, validationResult } from 'express-validator';
import { dbHelpers } from '../config/database.js';
import { sendContactEmail } from '../config/email.js';

const router = express.Router();

// Validation rules
const contactValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('company').optional().trim(),
    body('message').trim().notEmpty().withMessage('Message is required')
];

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, company, message } = req.body;

    try {
        // Save to database
        const submission = await dbHelpers.addContactSubmission({
            name,
            email,
            company: company || null,
            message
        });

        // Send email notification (don't wait for it)
        sendContactEmail({ name, email, company, message })
            .catch(err => console.error('Email sending failed:', err));

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.',
            id: submission.id
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit contact form. Please try again later.'
        });
    }
});

// GET /api/contact - Get all contact submissions (admin only - add auth later)
router.get('/', async (req, res) => {
    try {
        const submissions = await dbHelpers.getAllContactSubmissions();
        res.json({ success: true, data: submissions });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch submissions' });
    }
});

export default router;
