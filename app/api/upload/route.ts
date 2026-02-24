import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);

        // Ensure directory exists
        await fs.mkdir(path.join(process.cwd(), 'public', 'uploads'), { recursive: true });

        // Save file
        await fs.writeFile(uploadPath, buffer);

        // Return relative path for public access
        const publicPath = `/uploads/${filename}`;

        return NextResponse.json({ url: publicPath });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
