import fs from 'fs';
import path from 'path';

export function getAdminPassword(): string {
    // Priority 1: Hidden file (for local/custom deployment as requested)
    try {
        const filePath = path.join(process.cwd(), '.admin_password');
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8').trim();
        }
    } catch (error) {
        console.error('Error reading admin password file:', error);
    }

    // Priority 2: Environment variable (fallback)
    if (process.env.ADMIN_PASSWORD) {
        return process.env.ADMIN_PASSWORD;
    }

    // Fallback (should not be reached if correctly configured)
    return 'fa@!ac$e.2026'; // Default as requested in case file read fails
}
