import { Laugh, Mic, Plus, Send } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const MessageInput = () => {
    const [msgText, setMsgText] = useState("");
    return (
        <div className="bg-gray-800 p-2 flex gap-4 items-center">
            <div className="relative flex gap-2 ml-2">
                {/* Emoji picker will go here */}
                <Laugh className="text-gray-300" />
            </div>
            <Plus />
            <form className="w-full flex gap-3">
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