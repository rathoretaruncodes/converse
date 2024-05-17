import LeftPanel from "@/components/home/left-panel";
import RightPanel from "@/components/home/right-panel";

export default function Home() {
  return (
    <main className="m-5">
      <div className="flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-gray-900">
      {/* Purple background decorator for light mode */}
        <LeftPanel />
        <RightPanel />
    </div>
    </main>
  );
}
