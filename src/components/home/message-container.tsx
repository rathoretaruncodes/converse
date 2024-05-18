import { messages } from "@/dummy-data/db";


const MessageContainer = () => {
    return (
        <div className="relative p-3 flex-1 overflow-auto h-full bg-gray-800">
            <div className="mx-12 flex flex-col gap-3 h-full">
                {messages?.map((msg, idx) => (
                    <div key={msg._id}>
                        <ChatBubble />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageContainer;