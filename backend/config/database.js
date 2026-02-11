import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || join(__dirname, '../database/db.json');
const dbDir = dirname(dbPath);

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Configure lowdb to use JSON file
const adapter = new JSONFile(dbPath);
const defaultData = {
    contactSubmissions: [],
    newsletterSubscriptions: [],
    projectInquiries: []
};

const db = new Low(adapter, defaultData);

// Initialize database
export async function initializeDatabase() {
    await db.read();

    // Set default data if database is empty
    db.data ||= defaultData;

    await db.write();
    console.log('✅ Database initialized successfully');
}

// Helper functions for database operations
export const dbHelpers = {
    // Contact submissions
    async addContactSubmission(data) {
        await db.read();
        const submission = {
            id: Date.now(),
            ...data,
            created_at: new Date().toISOString()
        };
        db.data.contactSubmissions.push(submission);
        await db.write();
        return submission;
    },

    async getAllContactSubmissions() {
        await db.read();
        return db.data.contactSubmissions.sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        );
    },

    // Newsletter subscriptions
    async addNewsletterSubscription(email) {
        await db.read();

        // Check if already exists
        const existing = db.data.newsletterSubscriptions.find(
            sub => sub.email === email
        );

        if (existing) {
            if (existing.is_active) {
                return { exists: true, subscription: existing };
            } else {
                // Reactivate
                existing.is_active = true;
                await db.write();
                return { reactivated: true, subscription: existing };
            }
        }

        // New subscription
        const subscription = {
            id: Date.now(),
            email,
            subscribed_at: new Date().toISOString(),
            is_active: true
        };
        db.data.newsletterSubscriptions.push(subscription);
        await db.write();
        return { new: true, subscription };
    },

    async unsubscribeNewsletter(email) {
        await db.read();
        const subscription = db.data.newsletterSubscriptions.find(
            sub => sub.email === email
        );

        if (!subscription) {
            return { found: false };
        }

        subscription.is_active = false;
        await db.write();
        return { found: true, subscription };
    },

    async getActiveSubscribers() {
        await db.read();
        return db.data.newsletterSubscriptions
            .filter(sub => sub.is_active)
            .sort((a, b) => new Date(b.subscribed_at) - new Date(a.subscribed_at));
    },

    // Project inquiries
    async addProjectInquiry(data) {
        await db.read();
        const inquiry = {
            id: Date.now(),
            ...data,
            created_at: new Date().toISOString()
        };
        db.data.projectInquiries.push(inquiry);
        await db.write();
        return inquiry;
    },

    async getAllProjectInquiries() {
        await db.read();
        return db.data.projectInquiries.sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        );
    },

    async getProjectStats() {
        await db.read();
        const total = db.data.projectInquiries.length;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recent = db.data.projectInquiries.filter(
            inquiry => new Date(inquiry.created_at) >= thirtyDaysAgo
        ).length;

        return { total, last30Days: recent };
    }
};

// Initialize on import
await initializeDatabase();

export default db;
