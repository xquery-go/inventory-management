import { cn } from "@/lib/utils";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<T>;
  rows?: number;
  isError?: any;
  errorMessage?: string;
}

export const Textarea = <T extends FieldValues>({
  rows,
  name,
  placeholder,
  className,
  register,
  isError,
  errorMessage,
  ...rest
}: Props<T>) => {
  return (
    <div className="relative w-full">
      <textarea
        {...rest}
        rows={rows || 5}
        id={name}
        className={cn(
          "z-[1] font-roboto relative px-2.5 pb-2.5 pt-2.5 w-full text-sm text-black bg-transparent rounded-lg border border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-primaryCol peer",
          isError && "border-red-500 focus:border-red-500",
          className
        )}
        placeholder=""
        {...register(name as Path<T>)}
      />
      <label
        htmlFor={name}
        className={cn(
          "z-[1] select-none font-roboto absolute text-sm text-gray-700 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-supportBg px-2 peer-focus:px-2 peer-focus:text-primaryCol peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
          isError && "text-red-500 peer-focus:text-red-500"
        )}
      >
        {isError ? errorMessage : placeholder}
      </label>
    </div>
  );
};