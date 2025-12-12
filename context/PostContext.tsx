"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { get, set } from "idb-keyval";
import { v4 as uuidv4 } from "uuid";

// ... Type defs ...
export type Post = {
    id: string;
    title: string;
    content: string; // HTML content from editor
    excerpt?: string;
    createdAt: string;
    updatedAt: string;
    status: "published" | "draft";
};

interface PostContextType {
    posts: Post[];
    addPost: (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => string;
    updatePost: (id: string, updates: Partial<Post>) => void;
    deletePost: (id: string) => void;
    getPost: (id: string) => Post | undefined;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from IndexedDB on mount
    useEffect(() => {
        get("blogg_posts").then((val) => {
            if (val) setPosts(val);
            setIsLoaded(true);
        });
    }, []);

    // Save to IndexedDB whenever posts change
    useEffect(() => {
        if (isLoaded) {
            set("blogg_posts", posts).catch(console.error);
        }
    }, [posts, isLoaded]);

    const addPost = (newPostData: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
        const newPost: Post = {
            ...newPostData,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setPosts((prev) => [newPost, ...prev]);
        return newPost.id;
    };

    const updatePost = (id: string, updates: Partial<Post>) => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === id
                    ? { ...post, ...updates, updatedAt: new Date().toISOString() }
                    : post
            )
        );
    };

    const deletePost = (id: string) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    const getPost = (id: string) => {
        return posts.find((post) => post.id === id);
    };

    return (
        <PostContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost }}>
            {children}
        </PostContext.Provider>
    );
}

export function usePosts() {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error("usePosts must be used within a PostProvider");
    }
    return context;
}
