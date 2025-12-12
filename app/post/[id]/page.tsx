"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { Editor } from "@/components/editor/Editor"
import { usePosts } from "@/context/PostContext"
import { Button } from "@/components/ui/button"

export default function EditorPage() {
    const params = useParams()
    const router = useRouter()
    const { getPost, posts } = usePosts() // posts dependency to force re-render if loaded
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const post = getPost(params.id as string)

    if (!post) {
        // Redirect to dashboard if post is not found
        // Use a timeout to avoid conflicts during render
        setTimeout(() => router.replace("/dashboard"), 0)
        return null
    }

    return <Editor post={post} />
}
