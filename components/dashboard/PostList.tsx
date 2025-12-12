"use client"

import Link from "next/link"
import { format } from "date-fns"
import { Edit2, MoreVertical, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { usePosts } from "@/context/PostContext"

export function PostList() {
    const { posts, deletePost } = usePosts()

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-full bg-muted/30 p-6 mb-4">
                    <Edit2 className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No posts yet</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                    Create a new post to get started with your blog.
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="group relative flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
                >
                    <div className="mb-4">
                        <h3 className="font-semibold leading-tight mb-2 line-clamp-2">
                            {post.title || "Untitled Post"}
                        </h3>
                        <div className="text-xs text-muted-foreground">
                            {format(new Date(post.updatedAt), "MMM d, yyyy")}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${post.status === "published"
                                ? "bg-green-500/15 text-green-700 dark:bg-green-500/20 dark:text-green-400 border border-green-200 dark:border-green-900"
                                : "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-900"
                                }`}
                        >
                            {post.status}
                        </span>

                        <div className="flex gap-1.5 opacity-100 transition-opacity">
                            <Link href={`/post/${post.id}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                    <Edit2 className="h-3.5 w-3.5" />
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => deletePost(post.id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
