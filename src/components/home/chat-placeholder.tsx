import Image from "next/image";
import { Button } from "../ui/button";
import { Lock } from "lucide-react";


const ChatPlaceholder = () => {
    return (
        <div className="w-3/4 bg-gray-800 flex flex-col items-center justify-center py-10">
            <div className="flex flex-col items-center text-center justify-center py-10 gap-4 px-10">
                {/* <Image src={"/desktop-hero.png"} alt="Hero" width={320} height={188} /> */}
                <p className="text-3xl font-extralight mt-5 mb-2">Download Converse for Windows</p>
                <p className="w-1/2 text-center text-gray-500 text-sm text-muted-foreground">
                    Make calls, share your screen and get a faster experience when you download the Windows app.
                </p>

                <Button className="rounded-full my-5 bg-purple-700 hover:bg-purple-600">
                    Get from Microsoft Store
                </Button>
            </div>

            <p className="2-1/2 mt-auto text-center text-gray-500 text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Lock size={10} />
                Your personal messages are end-to-end encrypted
            </p>
        </div>
    )
}

export default ChatPlaceholder;