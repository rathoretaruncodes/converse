import { Avatar } from "../ui/avatar"


const Conversation = ({conversation }: {conversation: any}) => {

    return (
        <>
            <div className={`flex gap-2 items-center p-3 hover:bg-chat-hover cursor-pointer`}>
                <Avatar className="border border-gray-900 overflow-visible relative">

                </Avatar>
            </div>
        </>
    )
}

export default Conversation;