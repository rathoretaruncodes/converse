import { LogOut, MessageSquareDiff, User } from "lucide-react";
import ThemeSwitch from "../theme-switch";


const LeftPanel = () => {

    return (
        <div className="w-1/4 border-gray-600 border-r">
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
                </div>
            </div>
        </div>
    )
}

export default LeftPanel;