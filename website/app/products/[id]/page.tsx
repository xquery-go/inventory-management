"use client";

import { getSingleProduct } from "@/API/product.api";
import { ProductDetailSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/cart.store";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const SingleProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const setCartData = useCartStore((state) => state.setValues);

  const addProductToCart = () => {
    if (!data?.response || !data.success) return;
    const currentCartItems = useCartStore.getState().cartItems;
    const existingProductIndex = currentCartItems.findIndex(
      (item) => item._id === id
    );

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, increment the quantity
      const updatedCartItems = currentCartItems.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartData({ cartItems: updatedCartItems, open: true });
    } else {
      setCartData({
        open: true,
        cartItems: [
          ...currentCartItems,
          {
            _id: id,
            name: data.response.name,
            image: data.response.imageUrls[0],
            price: Number(data.response.price),
            quantity,
          },
        ],
      });
    }
  };

  return (
    <section className="section sm:py-10 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-0">
        {isLoading ? (
          <ProductDetailSkeleton />
        ) : (
          <>
            {/* Image Display */}
            <div className="grid gap-4">
              <div className="relative overflow-hidden">
                <Image
                  src={data?.response.imageUrls[currentImage]}
                  alt={data?.response.name}
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-2">
                {data?.response.imageUrls.map((url: string, index: number) => (
                  <button
                    key={index}
                    className={cn(
                      "border border-primary/50 rounded-md overflow-hidden transition-colors hover:border-primary",
                      currentImage === index && "border-primaryCol"
                    )}
                  >
                    <Image
                      src={url}
                      alt={data.response.name}
                      width={300}
                      height={300}
                      onClick={() => setCurrentImage(index)}
                      className="object-cover w-28 h-20"
                    />
                  </button>
                ))}
              </div>
            </div>
            {/* Product Details */}
            <div className="grid gap-3">
              <div>
                <h1 className="text-3xl font-bold text-black">
                  {data?.response.name}
                </h1>
                <p className="text-muted-foreground mt-4">
                  {data?.response.description}
                </p>
              </div>
              <div className="grid">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary" />
                  <Star className="w-5 h-5 fill-primary" />
                  <Star className="w-5 h-5 fill-primary" />
                  <Star className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <Star className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <span className="text-muted-foreground text-sm">(4.3)</span>
                </div>
                <div className="text-4xl font-bold text-primary">
                  ${data?.response.price}
                </div>
              </div>
              <ProductInputs quantity={quantity} setQuantity={setQuantity} />
              <Button
                size="lg"
                className="mt-2 bg-primaryCol hover:bg-primaryCol/90 text-primary-foreground"
                onClick={() => addProductToCart()}
              >
                Add to Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SingleProductPage;

const ProductInputs = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: any;
}) => {
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 1) setQuantity(1);
    else setQuantity(value);
  };

  return (
    <div className="grid gap-2">
      <div className="grid">
        <Label htmlFor="color" className="text-base">
          Color
        </Label>
        <RadioGroup
          id="color"
          defaultValue="black"
          className="flex items-center gap-2"
        >
          <Label
            htmlFor="color-black"
            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
          >
            <RadioGroupItem id="color-black" value="black" />
            Black
          </Label>
          <Label
            htmlFor="color-white"
            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
          >
            <RadioGroupItem id="color-white" value="white" />
            White
          </Label>
          <Label
            htmlFor="color-green"
            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
          >
            <RadioGroupItem id="color-green" value="green" />
            Green
          </Label>
        </RadioGroup>
      </div>
      <div className="grid">
        <Label htmlFor="size" className="text-base">
          Size
        </Label>
        <RadioGroup
          id="size"
          defaultValue="m"
          className="flex items-center gap-2"
        >
          <Label
            htmlFor="size-xs"
            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
          >
            <RadioGroupItem id="size-xs" value="xs" />
            XS
          </Label>
          <Label
            htmlFor="size-s"
            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
          >
            <RadioGroupItem id="size-s" value="s" />S
          </Label>
          <Label
            htmlFor="size-m"
            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
          >
            <RadioGroupItem id="size-m" value="m" />M
          </Label>
          <Label
            htmlFor="size-l"
            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
          >
            <RadioGroupItem id="size-l" value="l" />L
          </Label>
          <Label
            htmlFor="size-xl"
            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
          >
            <RadioGroupItem id="size-xl" value="xl" />
            XL
          </Label>
        </RadioGroup>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="quantity" className="text-base">
          Quantity
        </Label>
        <div className="flex items-center gap-x-2 ">
          <Button
            variant="outline"
            className="text-lg"
            onClick={() =>
              setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1))
            }
          >
            -
          </Button>
          <Input
            type="number"
            inputMode="numeric"
            value={quantity}
            onChange={handleQuantityChange}
            className="max-w-[100px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            variant="outline"
            className="text-lg"
            onClick={() =>
              setQuantity((prev: number) => (prev < 10 ? prev + 1 : 10))
            }
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
