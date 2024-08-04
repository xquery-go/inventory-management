import { cn } from "@/lib/utils";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<T>;
  rows?: number;
}

export const Textarea = <T extends FieldValues>({
  rows,
  name,
  placeholder,
  className,
  register,
  ...rest
}: Props<T>) => {
  return (
    <div className="relative w-full">
      <textarea
        {...rest}
        rows={rows || 5}
        id={name}
        className={cn(
          "z-[1] font-roboto relative px-2.5 pb-2.5 pt-2.5 w-full text-sm text-lightGray bg-transparent rounded-lg border border-borderCol dark:border-neutral-800 appearance-none focus:outline-none focus:ring-0 focus:border-primaryCol dark:focus:border-primaryCol peer",
          className
        )}
        placeholder=""
        {...register(name as Path<T>)}
      />
      <label
        htmlFor={name}
        className="z-[1] font-roboto absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-bg dark:bg-darkBg px-2 peer-focus:px-2 peer-focus:text-primaryCol peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {placeholder}
      </label>
    </div>
  );
};
