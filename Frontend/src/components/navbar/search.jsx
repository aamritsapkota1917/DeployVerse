import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <>
      <div className="relative  sm:flex-1 max-w-md">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="sm:w-full rounded-lg hidden md:block bg-muted pl-8 pr-4 py-2 text-sm"
        />
        <SearchIcon className="block md:hidden" />
      </div>
    </>
  );
};

export default Search;
