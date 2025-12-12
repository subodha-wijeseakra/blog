"use client"

import { Trash2 } from "lucide-react"
import { usePosts } from "@/context/PostContext"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function SettingsPage() {
    const { posts, deletePost } = usePosts()

    const handleClearAll = () => {
        if (confirm("Are you sure you want to delete all posts? This action cannot be undone.")) {
            posts.forEach((post) => deletePost(post.id))
        }
    }

    return (
        <div className="container mx-auto max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your blog configuration.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Management</CardTitle>
                        <CardDescription>
                            Manage your local data storage.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium">Clear All Data</label>
                                <p className="text-sm text-muted-foreground">
                                    Remove all posts from your local storage.
                                </p>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={handleClearAll}
                                disabled={posts.length === 0}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete All Posts
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
