"use client";

import { useMessage } from "../contexts"

export default function Message() {   
    const message = useMessage();
    return (
        <div className="w-full max-w-2xl p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg text-center">
            <p className="text-lg">{message.text}</p>
        </div>
    )
}