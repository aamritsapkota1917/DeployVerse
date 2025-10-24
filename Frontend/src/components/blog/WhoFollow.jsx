import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const WhoFollow = () => {
  return (
    <div className=" max-w-xs">
      <h3 className="text-lg font-medium mb-4">Who to Follow</h3>
      <div className="space-y-4 ">
        <div className="flex items-center  gap-5 ">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <Link href="#" className="text-sm font-medium hover:underline">
              John Doe
            </Link>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto ">
            Follow
          </Button>
        </div>

        <div className="flex items-center gap-5">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div>
            <Link href="#" className="text-sm font-medium hover:underline">
              Jane Appleseed
            </Link>
            <p className="text-sm text-muted-foreground">@janeappleseed</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Follow
          </Button>
        </div>

        <div className="flex items-center gap-5 ">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div>
            <Link href="#" className="text-sm font-medium hover:underline">
              Sarah Myles
            </Link>
            <p className="text-sm text-muted-foreground">@sarahmyles</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};
