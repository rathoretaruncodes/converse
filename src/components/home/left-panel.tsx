"use client";
import { ListFilter, Search } from "lucide-react";
import ThemeSwitch from "../theme-switch";
import { Input } from "../ui/input";
import Conversation from "./conversation";
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import UserListDialog from "./user-list-dialog";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";


const LeftPanel = () => {
    const { isAuthenticated } = useConvexAuth();
    const conversations = useQuery(api.conversations.getMyConversations, isAuthenticated ? undefined : "skip");

    return (
        <div className="w-1/4 border-gray-600 border-r">
            <div className="sticky top-0 z-10">
                {/* Header */}
                <div>
                    <div className="flex justify-between items-center bg-gray-800 h-16 px-4">
                        {/* <User size={24} /> */}
                        <UserButton />

                        <SignedIn>
                            <SignOutButton />
                        </SignedIn>

                        <SignedOut>
                            <SignInButton mode="modal" />
                        </SignedOut>

                        <div className="flex items-center gap-5">
                            {/* <MessageSquareDiff size={22} /> */}
                            {isAuthenticated && <UserListDialog />}
                            {/* <ThemeSwitch /> */}
                            {/* <LogOut size={20} className="cursor-pointer" /> */}
                            <ListFilter className="cursor-pointer" />
                        </div>
                    </div>
                    
                    <div className="p-3 flex items-center">
                        {/* Search */}
                        <div className="relative h-10 mx-2 flex-1">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={15} />
                            <Input type="text" placeholder="Search or start a new chat" className="pl-7 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent" />
                        </div>
                        
                    </div>
                </div>
                {/* Chat */}
                <div className="my-4 flex flex-col gap-0 max-h-[80%] overflow-auto">
                
                    {conversations?.map((conversation) => (
                        <Conversation key={conversation._id} conversation={conversation} />
                    ))}

                    {conversations?.length === 0 && (
                        <>
                            <p className="text-center text-sm mt-3">No conversations yet</p>
                            <p className="text-center text-sm mt-3">
                                Tell someone about the good thing that happened to you today.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeftPanel;