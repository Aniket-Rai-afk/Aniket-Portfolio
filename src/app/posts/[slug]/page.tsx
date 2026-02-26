import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    // Some routes might end in .html, let's strip it to find the base name, but if they
    // came to exactly `/posts/xyz.html` via NextJS it won't be caught by a dynamic route easily
    // unless the param is `slug: [ "xyz.html" ]` or NextJS intercepts it.
    // Wait, nextJS public folder serves `.html` before dynamic routes for some versions,
    // so we might need to actually RENAME the files in public/posts/ to something else,
    // like public/posts_data/ or just let NextJS do it.

    // Instead of doing that right now, let's write a python script to convert all those HTML files
    // into Next.js React Code?
    // Actually, reading the HTML and replacing the links inside the HTML files is much 
    // safer because it won't break anything unexpectedly.
}
