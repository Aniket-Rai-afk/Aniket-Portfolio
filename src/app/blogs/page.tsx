import { BlogSection } from "@/components/ui/blog-section";
import { Footer } from "@/components/Footer";

export default function BlogsPage() {
    return (
        <main className="min-h-screen bg-[#0f1419] text-gray-200 selection:bg-[#3b82f6] selection:text-white flex flex-col">
            <div className="flex-1 w-full pt-20">
                <BlogSection />
            </div>
            <Footer />
        </main>
    );
}
