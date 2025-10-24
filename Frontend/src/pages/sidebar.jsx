import { Recommended_topics } from "@/components/blog/recommended_topics";
import { WhoFollow } from "@/components/blog/WhoFollow";
import { RecentlySaved } from "@/components/blog/RecentlySaved";

export default function Sidebar() {
  return (
    <div className="hidden md:block  md:px-16 py-8 md:w-1/3 border-l   fixed  right-0  no-scrollbar h-screen  ">
      <div className="space-y-8">
        <Recommended_topics />
        <WhoFollow />
        <RecentlySaved />
      </div>
    </div>
  );
}
