"use client";
import { Video, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ChatPlaceholder from "./chat-placeholder";
import MessageContainer from "./message-container";
import MessageInput from "./message-input";
import GroupMembers from "./group-members-dialog";

const RightPanel = () => {
    const selectedConversation = true;
    if(!selectedConversation) 
        return <ChatPlaceholder />
    
    const conversationsName = "Sam Manek Shaw";
    const isGroup = true;

    return (
        <div className="w-3/4 flex flex-col">
            <div className="sticky top-0 z-10">
                {/* Header */}
                <div className="flex justify-between bg-gray-800">
                    <div className="flex justify-between items-center h-16 px-4">
                        <div className="flex items-center gap-5">
                            <Avatar>
                                <AvatarImage src={"/placeholder.png"} className="object-cover" />
                                <AvatarFallback>
                                <div className="animate-pulse w-full rounded-full" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p>{conversationsName}</p>
                                {isGroup && <GroupMembers />}
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