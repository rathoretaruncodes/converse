import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { MessageSquareDiff } from "lucide-react";

const UserListDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <MessageSquareDiff size={22} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {/* TODO: <DialogClose /> will be here */}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default UserListDialog;