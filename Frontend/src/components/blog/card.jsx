import { CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const BlogCard = ({ data }) => {
  return (
    <div className="flex p-4  max-w-3xl items-center bg-background border-b mb-5 justify-end ml-auto  ">
      <div className="flex flex-col flex-1 md:basis-2/3   ">
        <div className="flex items-center mb-2">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage src={data.avatar_url} />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{data.author_name}</span>
          <span className="text-muted-foreground mx-1">in</span>
          <span className="text-sm font-medium">{data.publication_name}</span>
        </div>
        <h2 className="text-xl font-bold mb-2">{data.title}</h2>
        <p className="text-muted-foreground mb-4">{data.description}</p>

        <CardFooter className="mt-4 flex items-center  justify-start text-muted-foreground gap-5 p-0 ">
          <span className="flex items-center space-x-1">
            <span>{data.created_date}</span>
          </span>
          <span className="flex items-center space-x-1">
            <HandIcon className="w-4 h-4" />
            <span>{data.likes}K</span>
          </span>
          <span className="flex items-center space-x-1">
            <ReplyIcon className="w-4 h-4" />
            <span>{data.comments}</span>
          </span>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <BookmarkIcon className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </div>
      <div className=" hidden md:flex  mt-4 md:mt-0 md:ml-4 flex-1 basis-1/3">
        <img
          src={data.image_url}
          alt="Needle and Thread"
          className="max-w-24 max-h-24  md:max-w-52 md:max-h-52  object-cover rounded"
        />
      </div>
    </div>
  );
};

function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function HandIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}

function ReplyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}
