"use client";
import { Video, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ChatPlaceholder from "./chat-placeholder";
import MessageContainer from "./message-container";
import MessageInput from "./message-input";

const RightPanel = () => {
    const selectedConversation = null;
    if(!selectedConversation) 
        return <ChatPlaceholder />
    
    const conversationsName = "John Doe";
    return (
        <div className="w-3/4 flex flex-col">
            <div className="w-full sticky top-0 z-50">
                {/* Header */}
                <div>
                    <div className="flex justify-between items-center bg-gray-800 p-5">
                        <div className="flex items-center gap-5">
                            <Avatar>
                                <AvatarImage src={"/placeholder.png"} className="object-cover" />
                                <AvatarFallback>
                                <div className="animate-pulse w-full rounded-full" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p>{conversationsName}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-7 mr-5">
                        <a href="/video-call" target="_blank">
                            <Video size={23} />
                        </a>
                        <X size={16} className="cursor-pointer" />
                    </div>
                </div>
            </div>
            {/* Chat Messages */}
            <MessageContainer />

            {/* Input */}
            <MessageInput />
        </div>
    )
}

export default RightPanel;