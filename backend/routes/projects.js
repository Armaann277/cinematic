import express from 'express';
import { body, validationResult } from 'express-validator';
import { dbHelpers } from '../config/database.js';
import { sendProjectInquiryEmail } from '../config/email.js';

const router = express.Router();

// Validation rules
const projectValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('company').optional().trim(),
    body('project_type').optional().trim(),
    body('budget_range').optional().trim(),
    body('timeline').optional().trim(),
    body('description').trim().notEmpty().withMessage('Project description is required')
];

// POST /api/projects/inquiry - Submit project inquiry
router.post('/inquiry', projectValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, company, project_type, budget_range, timeline, description } = req.body;

    try {
        // Save to database
        const inquiry = await dbHelpers.addProjectInquiry({
            name,
            email,
            company: company || null,
            project_type: project_type || null,
            budget_range: budget_range || null,
            timeline: timeline || null,
            description
        });

        // Send email notification
        sendProjectInquiryEmail({
            name,
            email,
            company,
            project_type,
            budget_range,
            timeline,
            description
        }).catch(err => console.error('Project inquiry email failed:', err));

        res.status(201).json({
            success: true,
            message: 'Thank you for your project inquiry! We will review it and get back to you soon.',
            id: inquiry.id
        });
    } catch (error) {
        console.error('Project inquiry error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit project inquiry. Please try again later.'
        });
    }
});

// GET /api/projects/inquiries - Get all project inquiries (admin only)
router.get('/inquiries', async (req, res) => {
    try {
        const inquiries = await dbHelpers.getAllProjectInquiries();
        res.json({ success: true, data: inquiries });
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch inquiries' });
    }
});

// GET /api/projects/stats - Get project inquiry statistics
router.get('/stats', async (req, res) => {
    try {
        const stats = await dbHelpers.getProjectStats();
        res.json({ success: true, stats });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
    }
});

export default router;
