import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ImageIcon, MessageSquareDiff } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { users } from "@/dummy-data/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Id } from "../../../convex/_generated/dataModel";

const UserListDialog = () => {

    const [renderedImage, setRenderedImage] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<Id<"users">[]>([]);
    const [groupName, setGroupName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const imgRef = useRef<HTMLInputElement>(null);

    return (
        <Dialog>
            <DialogTrigger>
                <MessageSquareDiff size={22} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {/* TODO: <DialogClose /> will be here */}
                    <DialogTitle> 
                        Contacts
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Start a new chat!
                </DialogDescription>
                    {renderedImage && (
                        <div className="w-16 h-16 relative mx-auto">
                            <Image src={renderedImage} fill alt="user image" className="rounded-full objecg-cover" />
                        </div>
                    )}
                    {/* TODO: Input file */}
                    {selectedUsers.length > 1 && (
                        <>
                            <Input
                                placeholder="Group Name"
                                value={groupName}
                                onChange={e => setGroupName(e.target.value)}
                            />
                            <Button className="flex gap-2">
                                <ImageIcon size={20} />
                                    Group Image
                            </Button>
                        </>
                    )}
                    <div className="flex flex-col gap-3 overflow-auto max-h-60">
                        {users?.map((user) => (
                            <div
                                key={user._id}
                                className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 transition-all ease-in-out duration-300
                                ${selectedUsers.includes(user._id) ? "bg-green-500" : ""}`}
                                onClick={() => {
                                    if(selectedUsers.includes(user._id)) {
                                        setSelectedUsers(selectedUsers.filter((id) => id !== user._id));
                                    } else {
                                        setSelectedUsers([...selectedUsers, user._id]);
                                    }
                                }}
                            >
                                <Avatar className="overflow-visible">
                                    {user.isOnline && (
                                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground" />
                                    )}

                                    <AvatarImage src={user.image} className="rounded-full object-cover" />
                                    <AvatarFallback>
                                        <div className="animate-pulse bg-gray-500 w-full h-full rounded-full" />
                                    </AvatarFallback>
                                </Avatar>

                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <p className="text-md font-medium">
                                            {user.name || user.email.split("@")[0]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <Button variant={"outline"}>Cancel</Button>
                        <Button disabled={selectedUsers.length === 0 || (selectedUsers.length >1 && !groupName || isLoading)}>
                            {/* spinner */}
                            {isLoading ? (
                                <div className="w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin" />
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserListDialog;