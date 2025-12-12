"use client"

import { useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Image from "@tiptap/extension-image"
import { ArrowLeft, Check, Cloud, Save } from "lucide-react"
import { useRouter } from "next/navigation"

import { Toolbar } from "./Toolbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePosts, type Post } from "@/context/PostContext"
import { ThemeToggle } from "@/components/theme-toggle"

interface EditorProps {
    post: Post
}

export function Editor({ post }: EditorProps) {
    const router = useRouter()
    const { updatePost } = usePosts()
    const [title, setTitle] = useState(post.title)
    const [status, setStatus] = useState<"saved" | "saving">("saved")

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: "rounded-lg max-w-full h-auto shadow-md my-4",
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder: "Type something amazing...",
            }),
        ],
        content: post.content,
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert max-w-none focus:outline-none min-h-[calc(100vh-300px)]",
            },
        },
        onUpdate: ({ editor }) => {
            setStatus("saving")
            updatePost(post.id, { content: editor.getHTML() })
            setTimeout(() => setStatus("saved"), 1000)
        },
        immediatelyRender: false,
    })

    // Debounced title update
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title !== post.title) {
                setStatus("saving")
                updatePost(post.id, { title })
                setTimeout(() => setStatus("saved"), 1000)
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [title, post.id, post.title, updatePost])

    return (
        <div className="flex flex-col h-screen bg-[#F9FBFD] dark:bg-background">
            {/* Header */}
            <div className="flex items-center gap-4 border-b bg-background px-4 py-3 shadow-sm">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/dashboard")}
                    title="Back to Dashboard"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>

                <div className="flex-1">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-9 w-full max-w-md border-transparent bg-transparent px-2 text-lg font-medium hover:border-border hover:bg-accent/50 focus:border-input focus:bg-background"
                        placeholder="Untitled Post"
                    />
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-xs">
                        {status === "saved" ? (
                            <>
                                <Cloud className="h-3.5 w-3.5" />
                                Saved to Device
                            </>
                        ) : (
                            <>
                                <Save className="h-3.5 w-3.5 animate-pulse" />
                                Saving...
                            </>
                        )}
                    </span>
                    <div className="h-4 w-px bg-border" />
                    <ThemeToggle />
                    <Button size="sm" className="gap-2" onClick={() => updatePost(post.id, { status: "published" })}>
                        Publish
                    </Button>
                </div>
            </div>

            {/* Editor Toolbar */}
            <Toolbar editor={editor} />

            {/* Editor Canvas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8" onClick={() => editor?.chain().focus().run()}>
                <div
                    className="mx-auto min-h-[1100px] w-full max-w-[850px] cursor-text bg-background px-8 py-12 shadow-sm ring-1 ring-border/5 dark:ring-border sm:px-16"
                    onClick={(e) => e.stopPropagation()}
                >
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}
