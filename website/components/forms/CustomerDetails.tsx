"use client";
import { customerSchema } from "@/validations/customer.validation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrder } from "@/API/order.api";
import { FloatingInput } from "../ui/FloatingInput";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

export const CustomerDetails = () => {
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addOrder,
  });

  const onSubmit: SubmitHandler<z.infer<typeof customerSchema>> = async (
    data
  ) => {
    console.log(data);

    // const { response, success } = await mutateAsync(formData);
    // if (success) {
    //   toast.success("Product Added!");
    //   reset();
    //   router.push("/products");
    // } else return toast.error(response as string);
  };

  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold font-roboto">Your Details:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        {/* Address */}

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div className="bg-supportBg py-2 px-4 shadow-sm rounded-md">
            <h3 className="text-lg mb-2 font-roboto">Personal Details</h3>
            <div className="flex flex-col gap-4">
              <FloatingInput
                placeholder="Name"
                name="name"
                register={register}
                isError={errors?.name}
                errorMessage={errors?.name?.message}
              />
              <FloatingInput
                placeholder="Email"
                name="email"
                register={register}
                isError={errors?.email}
                errorMessage={errors?.email?.message}
              />
              <FloatingInput
                placeholder="Phone"
                name="phone"
                register={register}
                isError={errors?.phone}
                errorMessage={errors?.phone?.message}
              />
            </div>
          </div>
          {/* Payment Method Select Radio */}
          <div className="bg-supportBg py-2 px-4 shadow-sm rounded-md">
            <h3 className="text-lg mb-2 font-roboto">Payment Method</h3>
            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between gap-2 border  rounded-md bg-white py-1 px-3">
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    value="Stripe"
                    {...register("paymentMethod")}
                  />
                  <span className="font-roboto">Stripe</span>
                </div>
                <Image
                  src="/images/icons/stripe.png"
                  alt="stripe"
                  width={70}
                  height={70}
                  className="object-cover w-[50px]"
                />
              </label>
              <label className="flex items-center justify-between gap-2 border  rounded-md bg-white py-1 px-3">
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    value="Cash"
                    {...register("paymentMethod")}
                  />
                  <span className="font-roboto">Cash On Delivery (COD)</span>
                </div>
                <Image
                  src="/images/icons/cod.png"
                  alt="cod"
                  width={70}
                  height={70}
                  className="object-cover w-[50px]"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
          {/* Shipping Address */}
          <div className="bg-supportBg py-2 px-4 shadow-sm rounded-md">
            <h3 className="text-lg mb-2 font-roboto">Shipping Address</h3>
            <div className="flex flex-col gap-4">
              <FloatingInput
                placeholder="Street"
                name="shippingAddress.street"
                register={register}
                isError={errors?.shippingAddress?.street}
                errorMessage={errors?.shippingAddress?.street?.message}
              />
              <FloatingInput
                placeholder="City"
                name="shippingAddress.city"
                register={register}
                isError={errors?.shippingAddress?.city}
                errorMessage={errors?.shippingAddress?.city?.message}
              />
              <FloatingInput
                placeholder="State"
                name="shippingAddress.state"
                register={register}
                isError={errors?.shippingAddress?.state}
                errorMessage={errors?.shippingAddress?.state?.message}
              />
            </div>
          </div>
          {/* Billing Address */}
          <div className="bg-supportBg py-2 px-4 shadow-sm rounded-md">
            <div className="flex max-md:flex-col md:items-center md:justify-between">
              <h3 className="text-lg mb-2 font-roboto">Billing Address</h3>
              <label
                htmlFor="same-as-shipping"
                className="text-sm flex items-center max-md:mb-3"
              >
                <input
                  type="checkbox"
                  id="same-as-shipping"
                  className="mr-2"
                  disabled={
                    !watch("shippingAddress.city") &&
                    !watch("shippingAddress.state") &&
                    !watch("shippingAddress.street")
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue("billingAddress", watch("shippingAddress"));
                    } else {
                      setValue("billingAddress", {
                        street: "",
                        city: "",
                        state: "",
                      });
                    }
                  }}
                />
                <p className="text-sm select-none cursor-pointer font-roboto">
                  Same as Shipping Address
                </p>
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <FloatingInput
                placeholder="Street"
                name="billingAddress.street"
                register={register}
                isError={errors?.billingAddress?.street}
                errorMessage={errors?.billingAddress?.street?.message}
              />
              <FloatingInput
                placeholder="City"
                name="billingAddress.city"
                register={register}
                isError={errors?.shippingAddress?.city}
                errorMessage={errors?.billingAddress?.city?.message}
              />
              <FloatingInput
                placeholder="State"
                name="billingAddress.state"
                register={register}
                isError={errors?.billingAddress?.state}
                errorMessage={errors?.billingAddress?.state?.message}
              />
            </div>
          </div>
        </div>

        <div className="bg-supportBg py-2 px-4 shadow-sm rounded-md mt-5 md:max-w-[50%]">
          <h3 className="text-lg mb-2 font-roboto">Notes (Optional)</h3>
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="Notes"
              name="notes"
              register={register}
              isError={errors?.notes}
              errorMessage={errors?.notes?.message}
              className="resize-none h-full"
            />
          </div>
        </div>

        <button className="bg-primaryCol text-white py-2.5 px-8 mt-10"
        disabled={isPending}
        >{isPending ? "Placing your order..." : "Place Order"}</button>
      </form>
    </div>
  );
};
