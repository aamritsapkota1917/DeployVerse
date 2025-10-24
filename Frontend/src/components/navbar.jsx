import Logo from "./navbar/logo";
import Search from "./navbar/search";
import Write_content from "./navbar/write_content";
import Notification from "./navbar/Notification";
import Profile from "./navbar/Profile";
import { Toggle_theme } from "@/components/ui/toggle_theme";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-background border-b relative">
      {/* logo */}

      <Logo />

      {/* search  */}

      <Search />

      <div className="flex items-center gap-7">
        <Toggle_theme />

        {/* write contents */}

        <Write_content />

        {/* drop down for notification */}

        <Notification />

        {/* drop down for profile */}
        <Profile />
      </div>
    </header>
  );
}
