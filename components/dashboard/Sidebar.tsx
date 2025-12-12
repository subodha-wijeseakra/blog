"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FileText, LayoutDashboard, Plus, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePosts } from "@/context/PostContext"

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { addPost } = usePosts()

    const handleCreatePost = () => {
        const id = addPost({
            title: "Untitled Post",
            content: "",
            status: "draft",
        })
        router.push(`/post/${id}`)
    }

    const links = [
        {
            name: "All Posts",
            href: "/dashboard",
            icon: FileText,
        },
        {
            name: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
        },
    ]

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-muted/40 p-4">
            <div className="mb-8 flex h-14 items-center px-2 font-bold text-xl">
                <LayoutDashboard className="mr-2 h-6 w-6" />
                Blogg.
            </div>

            <Button
                onClick={handleCreatePost}
                className="mb-6 w-full justify-start gap-2 shadow-lg hover:shadow-xl transition-all"
                size="lg"
            >
                <Plus className="h-5 w-5" />
                New Post
            </Button>

            <div className="flex-1 space-y-1">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                            pathname === link.href ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground"
                        )}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className="mt-auto border-t pt-4">
                <div className="flex items-center justify-between px-2">
                    <span className="text-xs text-muted-foreground">Theme</span>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}
