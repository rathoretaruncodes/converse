import { MessageSeenSvg } from "@/lib/svgs";
import { IMessage, useConversationStore } from "@/store/chat-store";
import ChatBubbleAvatar from "./chat-bubble-avatar";
import DateIndicator from "./date-indicator";
import Image from "next/image";


type ChatBubbleProps = {
    message: IMessage;
    me: any;
    previousMessage?: IMessage;
}

const ChatBubble = ({ me, message, previousMessage }: ChatBubbleProps) => {

    const date = new Date(message._creationTime);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const time = `${hour}: ${minute}`;

    const { selectedConversation } = useConversationStore();
    const isMember = selectedConversation?.participants.includes(message.sender._id) || false;
    const isGroup = selectedConversation?.isGroup;
    const fromMe = message.sender._id === me._id;
    const bgClass = fromMe ? "bg-purple-800": "bg-gray-800";

    if (!fromMe) {
        return (
            <>
                <div className="flex w-2/3">
                    <ChatBubbleAvatar
                        isGroup={isGroup}
                        isMember={isMember}
                        message={message}
                    />
                    <div className={`flex flex-col z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}>
                        <OtherMessageIndicator />
                        {message.messageType === "text" && <TextMessage message={message} />}
                        {message.messageType === "image" && <ImageMessage message={message} />}
                        <MessageTime 
                            time={time}
                            fromMe={fromMe}
                        />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <DateIndicator message={message} previousMessage={previousMessage} />
            <div className="flex gap-1 w-2/3 ml-auto">
                <div className={`flex z-20 max-w-fit px-2 pt-1 rounded-md shadow-md ml-auto relative ${bgClass}`}>
                    <SelfMessageIndicator />
                    {message.messageType === "text" && <TextMessage message={message} />}
                    {message.messageType === "image" && <ImageMessage message={message} />}
                    <MessageTime 
                        time={time}
                        fromMe={fromMe}
                    />
                </div>
            </div>
        </>
    )
}

export default ChatBubble;

const ImageMessage = ({ message }: { message: IMessage; }) => {
    return (
        <div className="w-[250px] h-[250px] m-2 relative">
            <Image 
                src={message.content}
                fill
                className="cursor-pointer object-cover rounded"
                alt="image"
                
            />
        </div>
    )
}

const MessageTime = ({ time, fromMe }: { time: string; fromMe: boolean }) => {
    return (
        <p className="text-[10px] mt-2 mb-0.5 self-end flex gap-1 items-center">
            {time} {fromMe && <MessageSeenSvg />}
        </p>
    );
};

const OtherMessageIndicator = () => (
    <div className="absolute bg-gray-800 top-0 -left-[4px] w-3 h-3 rounded-bl-full" />
);

const SelfMessageIndicator = () => (
    <div className="absolute bg-purple-800 top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden" />
);

const TextMessage = ({ message }: { message: IMessage }) => {
    //Checks if the content is a URL/Link or not
    const isLink = /^(ftp|http|https):\/\/[^ "]+$/.test(message.content);

    return (
        <div>
            {isLink ? (
                <a
                    href={message.content}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`mr-2 text-sm font-light text-blue-400 underline`}
                >
                    {message.content}
                </a>
            ) : (
                <p className={`mr-2 text-sm font-light`}>{message.content}</p>
            )}
        </div>
    );
};

