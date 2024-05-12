import { ListFilter, LogOut, MessageSquareDiff, Search, User } from "lucide-react";
import ThemeSwitch from "../theme-switch";
import { Input } from "../ui/input";


const LeftPanel = () => {
    const conversations = [];
    return (
        <div className="w-1/4 border-purple-900 border-r-2">
            <div className="sticky top-0 bg-left-panel z-10">
                {/* Header */}
                <div className="flex justify-between bg-gray-primary p-3 items-center">
                    <User size={24} />
                    <div className="flex items-center gap-3">
                        {/* TODO: This line will be replace with <UserListDialog/> */}
                        <MessageSquareDiff size={20} />
                        <ThemeSwitch />
                        <LogOut size={20} className="cursor-pointer" />
                    </div>
                    <div className="p-3 flex items-center">
                        {/* Search */}
                        <div className="relative h-10 mx-3 flex-1">
                            <Search className="absolute left-3 top-1/2 transfomr -translate-y-1/2 text-gray-500 z-10" size={18} />
                            <Input type="text" placeholder="Search or Start a new chat" className="pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent" />
                        </div>
                        <ListFilter className="cursor-pointer" />
                    </div>
                </div>
                {/* Chat */}
                <div className="my-3 flex flex-col gap-0 max-h-[80%] overflow-auto">
                    {/* Conversations */}
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