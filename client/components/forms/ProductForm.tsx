"use client";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { convertImage } from "@/lib/helpers";
import { useState } from "react";
import { FloatingInput } from "../ui/FloatingInput";
import { productSchema } from "@/validations/product.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { CategorySelect } from "../helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addProduct } from "@/API/product.api";

interface FileInfo {
  file: File;
  preview: string;
}

export const ProductForm = ({ isUpdate }: { isUpdate?: boolean }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  const [files, setFiles] = useState<FileInfo[]>([]);

  const handleFileChange = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).slice(0, 5 - files.length);

    const filePromises = newFiles.map(async (file) => {
      const preview = await convertImage(file);
      return { file, preview };
    });

    const newFileInfos = await Promise.all(filePromises);
    setFiles((prevFiles) => [...prevFiles, ...newFileInfos].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const { mutateAsync } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof productSchema>> = async (
    data
  ) => {
    if (!files.length) return toast.error("Add atleast 1 product image");
    if (files.length > 10) return toast.error("Maximum 10 images allowed");
    const formData = new FormData();
    files.forEach(({ file }) => formData.append("images", file));
    formData.append("name", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("stock", data.quantity);

    const { response, success } = await mutateAsync(formData);
    if (success) {
      toast.success("Product Added!");
      reset();
      router.push("/products");
    } else return toast.error(response as string);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-7 pt-4 max-w-3xl"
      >
        <div>
          {/* Image input */}
          <label
            htmlFor="product-files"
            className="bg-neutral-100 border dark:bg-neutral-800 dark:border-neutral-950 rounded-lg py-5 px-5 w-full center gap-x-1 cursor-pointer h-40 hover:bg-neutral-200 dark:hover:bg-neutral-800/80 transition-all duration-100"
          >
            <p>Add Images</p>
            <Plus />
          </label>
          <input
            type="file"
            id="product-files"
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
          />
          {/* Display images */}
          <div className="mt-3 flex items-center gap-3 flex-wrap justify-start">
            {files.map(({ preview }, index) => (
              <div className="relative" key={index}>
                <Image
                  src={preview}
                  alt="product-picture"
                  width={200}
                  height={200}
                  className={`${
                    index === 0 && "border-2 border-primaryCol"
                  } rounded-md object-cover w-[120px] h-[100px]`}
                />
                <button
                  type="button"
                  className="bg-red-600 text-darkText rounded-full center size-6 absolute -top-2 -right-2 shadow-md"
                  onClick={() => removeFile(index)}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <FloatingInput
          placeholder="Product Title"
          type="text"
          name="title"
          register={register}
          isError={errors.title || false}
          errorMessage={errors.title?.message}
        />

        <div>
          <CategorySelect
            watch={watch}
            setValue={setValue}
            isError={errors.category || false}
            errorMessage={errors.category?.message}
          />
        </div>
        <Textarea
          placeholder="Product Description"
          name="description"
          register={register}
          className="resize-none"
          isError={errors.description || false}
          errorMessage={errors.description?.message}
        />
        <div className="flex items-center w-full gap-3">
          <FloatingInput
            placeholder="Price"
            type="number"
            inputMode="numeric"
            name="price"
            register={register}
            min={0}
            isError={errors.price || false}
            errorMessage={errors.price?.message}
          />

          <FloatingInput
            placeholder="Quantity"
            type="number"
            inputMode="numeric"
            name="quantity"
            register={register}
            min={0}
            isError={errors.quantity || false}
            errorMessage={errors.quantity?.message}
          />
        </div>
        <Button
          className="disabled:opacity-50 mt-2 bg-primaryCol hover:bg-primaryCol/90 text-darkText"
          type="submit"
          disabled={isSubmitting}
        >
          {isUpdate ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </div>
  );
};
