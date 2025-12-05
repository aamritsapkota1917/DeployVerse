import Logo from "./navbar/logo";
import Notification from "./navbar/Notification";
import Profile from "./navbar/Profile";
import { Toggle_theme } from "@/components/ui/toggle_theme";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { PostDialogue } from "./blog/PostDialogue";
import { Link } from "react-router-dom";

export default function PublishNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-background border-b  sticky top-0 z-30 ">
      {/* logo */}
      <Link to="/" className="flex items-center gap-2">
        <p className=" hidden text-3xl font-bold md:block">DeployVerse</p>
      </Link>

      {/* search  */}

      <div className="flex items-center gap-7">
        <Toggle_theme />

        <Button onClick={() => setOpen(true)}>Publish</Button>
        <PostDialogue open={open} setOpen={setOpen} />

        {/* drop down for notification */}

        <Notification />

        {/* drop down for profile */}
        <Profile />
      </div>
    </header>
  );
}
