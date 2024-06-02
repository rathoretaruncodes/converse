import { Laugh, Mic, Plus, Send } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useConversationStore } from "@/store/chat-store";
import toast from "react-hot-toast";
import useComponentVisible from "@/hooks/useComponentVisible";
import EmojiPicker, { Theme } from "emoji-picker-react";


const MessageInput = () => {
    const [msgText, setMsgText] = useState("");

    const sendTextMsg = useMutation(api.messages.sendTextMessage);
    const me = useQuery(api.users.getMe);
    const { selectedConversation } = useConversationStore();

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    const handleSendTextMsg = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            await sendTextMsg({
                content: msgText, 
                conversation: selectedConversation!._id, 
                sender: me!._id
            })
            setMsgText("");

        } catch (error: any) {
            toast.error(error.message);
            console.error(error);
        }
    }

    return (
        <div className="bg-gray-800 p-2 flex gap-4 items-center">
            <div className="relative flex gap-2 ml-2">
                {/* Emoji picker will go here */}
                <div ref={ref} onClick={() => setIsComponentVisible(true)}>
                    {isComponentVisible && (
                        <EmojiPicker 
                        theme={Theme.DARK}
                        onEmojiClick={(emojiObject) => {
                            setMsgText(prev => prev + emojiObject.emoji);
                        }}
                        style={{position: "absolute", bottom: "1.3rem", left: "1rem", zIndex: 50}}
                        />
                    )}
                <Laugh className="text-gray-300" />
                </div>
                
            </div>
            <Plus />
            <form onSubmit={handleSendTextMsg} className="w-full flex gap-3">
                <div className="flex-1">
                    <Input
                            type="text"
                            placeholder="Type your messaage"
                            className="py-2 text-sm w-full rounded-lg shadow-sm bg-gray-700 focus-visible:ring-transparent"
                            value={msgText}
                            onChange={(e) => setMsgText(e.target.value)}
                    />
                </div>
                <div className="mr-4 flex items-center gap-3">
                    {msgText.length > 0 ? (
                        <Button
                                type="submit"
                                size={"sm"}
                                className="bg-transparent text-foreground hover:bg-transparent"
                        >
                            <Send />
                        </Button>
                    ) : (
                        <Button
                                type="submit"
                                size={"sm"}
                                className="bg-transparent text-foreground hover:bg-transparent"
                        >
                            <Mic />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default MessageInput;