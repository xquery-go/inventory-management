import { SearchBar, ToggleTheme, UserAvatar } from "../helpers";

export const Header = () => {
  return (
    <header className="sticky top-0 sm:px-10 py-5 border-b dark:border-neutral-800 flex items-center justify-between gap-x-2 w-full">
      <SearchBar />
      <div>
        <ToggleTheme />
        <UserAvatar />
      </div>
    </header>
  );
};
