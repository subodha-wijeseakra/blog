import { PostList } from "@/components/dashboard/PostList";

export default function DashboardPage() {
    return (
        <div className="container mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
                    <p className="text-muted-foreground mt-1">Manage your blog posts.</p>
                </div>
            </div>
            <PostList />
        </div>
    );
}
