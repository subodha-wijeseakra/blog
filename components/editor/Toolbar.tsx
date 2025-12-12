"use client"

import { type Editor } from "@tiptap/react"
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Quote,
    Undo,
    Redo,
    Image as ImageIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ToolbarProps {
    editor: Editor | null
}

export function Toolbar({ editor }: ToolbarProps) {
    if (!editor) {
        return null
    }

    const ToggleButton = ({
        isActive,
        onClick,
        children,
        title
    }: {
        isActive?: boolean
        onClick: () => void
        children: React.ReactNode
        title: string
    }) => (
        <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            title={title}
            className={cn(
                "h-8 w-8 p-0",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            )}
        >
            {children}
        </Button>
    )

    return (
        <div className="flex flex-wrap items-center gap-1 border-b bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full overflow-x-auto">
            <div className="flex items-center gap-1 pr-2 border-r mr-2">
                <ToggleButton
                    onClick={() => editor.chain().focus().undo().run()}
                    title="Undo"
                >
                    <Undo className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    onClick={() => editor.chain().focus().redo().run()}
                    title="Redo"
                >
                    <Redo className="h-4 w-4" />
                </ToggleButton>
            </div>

            <div className="flex items-center gap-1 pr-2 border-r mr-2">
                <ToggleButton
                    isActive={editor.isActive("bold")}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    isActive={editor.isActive("italic")}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    isActive={editor.isActive("underline")}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    title="Underline"
                >
                    <Underline className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    isActive={editor.isActive("strike")}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    title="Strikethrough"
                >
                    <Strikethrough className="h-4 w-4" />
                </ToggleButton>
            </div>

            <div className="flex items-center gap-1 pr-2 border-r mr-2">
                <ToggleButton
                    isActive={editor.isActive("heading", { level: 1 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    title="Heading 1"
                >
                    <Heading1 className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    isActive={editor.isActive("heading", { level: 2 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    title="Heading 2"
                >
                    <Heading2 className="h-4 w-4" />
                </ToggleButton>
            </div>

            <div className="flex items-center gap-1 pr-2 border-r mr-2">
                <ToggleButton
                    isActive={editor.isActive({ textAlign: "left" })}
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    title="Align Left"
                >
                    <AlignLeft className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    isActive={editor.isActive({ textAlign: "center" })}
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    title="Align Center"
                >
                    <AlignCenter className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    isActive={editor.isActive({ textAlign: "right" })}
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    title="Align Right"
                >
                    <AlignRight className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    isActive={editor.isActive({ textAlign: "justify" })}
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    title="Justify"
                >
                    <AlignJustify className="h-4 w-4" />
                </ToggleButton>
            </div>

            <div className="flex items-center gap-1">
                <ToggleButton
                    isActive={editor.isActive("bulletList")}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    isActive={editor.isActive("orderedList")}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Ordered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </ToggleButton>
                <ToggleButton
                    isActive={editor.isActive("blockquote")}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    title="Blockquote"
                >
                    <Quote className="h-4 w-4" />
                </ToggleButton>
                <div className="w-px h-4 bg-border mx-1" />
                <ToggleButton
                    onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = async (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) {
                                const reader = new FileReader()
                                reader.onload = (e) => {
                                    const src = e.target?.result as string
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (editor.chain().focus() as any).setImage({ src }).run()
                                }
                                reader.readAsDataURL(file)
                            }
                        }
                        input.click()
                    }}
                    title="Insert Image"
                >
                    <ImageIcon className="h-4 w-4" />
                </ToggleButton>
            </div>
        </div>
    )
}
