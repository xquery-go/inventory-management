"use client";
import { FormEvent, useState } from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { convertImage } from "@/lib/helpers";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/validations/category.validation";
import { FloatingInput } from "../ui/FloatingInput";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/API/category.api";

export const CategoryForm = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;
    setFile(file);
    const response = await convertImage(file);
    setPreview(response);
  };

  const { mutateAsync } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof categorySchema>> = async (
    data
  ) => {
    if (!file) return toast.error("Image is required");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("slug", data.slug);
    formData.append("image", file);

    const { response, success } = await mutateAsync(formData);
    if (success) {
      toast.success("Caetgory added successfully");
      reset();
      setFile(null);
      setPreview("");
      setOpen(false);
    } else return toast.error(response as string);
  };

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger className="flex items-center gap-x-1 bg-primaryCol text-darkText py-2 px-4 text-sm rounded-md">
        Add Category
        <Plus className="size-5" />
      </CredenzaTrigger>
      <CredenzaContent className="max-md:min-h-[400px] dark:bg-neutral-900 dark:border-neutral-800">
        <CredenzaHeader>
          <CredenzaTitle>Add Category</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="sm:max-h-[600px] max-h-[500px] overflow-y-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-4"
          >
            <div>
              {/* Image input */}
              <label htmlFor="category-file" className="relative h-40 w-full">
                {file && preview ? (
                  <Image
                    src={preview}
                    alt="category-preview"
                    width={400}
                    height={250}
                    className="object-cover w-full h-40 rounded-lg"
                  />
                ) : (
                  <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg py-5 px-5 w-full h-40 center gap-x-1 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800/80 transition-all duration-100">
                    <p>Add Image</p>
                    <Plus />
                  </div>
                )}
              </label>
              <input
                type="file"
                id="category-file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
              />
              {/* Display images */}
            </div>

            <FloatingInput
              type="text"
              name="name"
              id="name"
              placeholder="Enter category name*"
              register={register}
              isError={errors.name || false}
              errorMessage={errors.name?.message}
            />
            <Textarea
              rows={5}
              id="description"
              placeholder="Enter category description"
              name="description"
              register={register}
              isError={errors.description || false}
              errorMessage={errors.description?.message}
            />
            <FloatingInput
              type="text"
              name="slug"
              id="slug"
              placeholder="Enter category slug*"
              register={register}
              isError={errors.slug || false}
              errorMessage={errors.slug?.message}
            />

            <CredenzaFooter className="">
              <Button
                className="w-full sm:text-lg bg-primaryCol hover:bg-primaryCol/90 text-darkText disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </Button>
            </CredenzaFooter>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
