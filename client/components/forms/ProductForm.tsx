"use client";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { convertImage } from "@/lib/helpers";
import { FormEvent, useState } from "react";

interface FileInfo {
  file: File;
  preview: string;
}

export const ProductForm = ({ isUpdate }: { isUpdate?: boolean }) => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-2 pt-4 max-w-3xl"
      >
        <div>
          {/* Image input */}
          <label
            htmlFor="product-files"
            className="bg-neutral-100 dark:bg-neutral-800 rounded-lg py-5 px-5 w-full center gap-x-1 cursor-pointer h-40 hover:bg-neutral-200 dark:hover:bg-neutral-800/80 transition-all duration-100"
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
          <div className="mt-3 flex items-center gap-2 flex-wrap justify-start">
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
        <div>
          <label htmlFor="title">Product Title</label>
          <Input
            type="text"
            id="title"
            placeholder="Enter product title"
            className="w-full my-1"
            value={productData.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        <div>
          <label htmlFor="desc">Product Description</label>
          <Textarea
            rows={5}
            id="desc"
            placeholder="Enter product Description"
            className="w-full my-1 resize-none"
            value={productData.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>

        <div>
          <label htmlFor="price">Product Price</label>
          <Input
            type="number"
            id="price"
            placeholder="Enter product title"
            className="w-full my-1"
            value={productData.price}
            min={0}
            onChange={handleInputChange}
            name="price"
          />
        </div>

        <div>
          <label htmlFor="quantity">Product Quantity</label>
          <Input
            type="number"
            id="quantity"
            placeholder="Enter product title"
            className="w-full my-1"
            value={productData.quantity}
            onChange={handleInputChange}
            min={0}
            name="quantity"
          />
        </div>
        <Button
          className="bg-primaryCol hover:bg-primaryCol/90 text-darkText"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
};
