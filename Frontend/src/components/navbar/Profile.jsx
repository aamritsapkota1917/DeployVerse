import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { CircleUser } from "lucide-react";
import useUser from "@/hooks/useUser";

import useLogout from "@/hooks/useLogout";

import { UserRound } from "lucide-react";
import { SquareLibrary } from "lucide-react";
import { BookText } from "lucide-react";

const Profile = () => {
  const { data } = useUser();
  const handleLogout = useLogout();

  return (
    <>
      <DropdownMenu className="px-10 bg-red-600">
        <DropdownMenuTrigger asChild>
          <CircleUser className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="px-5 rounded-md">
          <DropdownMenuLabel>{data?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex gap-3 items-center">
              <UserRound size={18} />
              <span>Profile</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex gap-3 items-center">
              <SquareLibrary size={18} />
              <span>Libraries</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div className="flex gap-3 items-center">
              <BookText size={18} />
              <span>Stories</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>

          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Profile;
