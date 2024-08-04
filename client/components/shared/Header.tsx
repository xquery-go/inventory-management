import { Bell } from "lucide-react";
import { SearchBar, ToggleTheme, UserAvatar } from "../helpers";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <header className="z-20 bg-bg dark:bg-darkBg sticky top-0 md:px-10 px-2 sm:py-5 py-3.5 border-b dark:border-neutral-800 flex items-center justify-between gap-x-2 w-full">
      <SearchBar />
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <ToggleTheme />
        <div className="max-md:hidden h-10 bg-neutral-200 w-[2px] rounded-lg mx-2"/>
        <UserAvatar />
      </div>
    </header>
  );
};