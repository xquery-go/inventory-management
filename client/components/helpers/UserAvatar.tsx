import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="max-md:hidden">
        <p className="text-text dark:text-darkText text-sm">Danish Siddiqui</p>
        <p className="text-xs text-neutral-500">@Admin</p>
      </div>
    </div>
  );
};
