"use client";
import { createPaymentLink } from "@/API/checkout.api";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const PaymentModal = ({
  open,
  setOpen,
  orderId,
  trackingNumber,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  orderId: string;
  trackingNumber: string;
}) => {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPaymentLink,
  });

  const handlePayment = async () => {
    if (!orderId) return;
    const { response, success } = await mutateAsync(orderId);
    if (success) router.push(response);
    else return toast.error(response as string);
  };

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="max-md:min-h-[400px] dark:bg-neutral-900 dark:border-neutral-800">
        <CredenzaTitle className="hidden">
          <h1>Order placed</h1>
        </CredenzaTitle>
        <CredenzaBody className="sm:max-h-[600px] max-h-[500px] overflow-y-auto">
          <div className="flex flex-col items-center">
            <Image
              src="/images/icons/order-done.png"
              alt="success"
              width={100}
              height={100}
              className="object-cover sm:size-[100px] size-[70px]"
            />
            <h1 className="text-3xl font-bold text-center mt-4">
              Your order has been placed
            </h1>
            <p className="text-center mt-4"></p>
            <p className="text-center">
              Your order number is:{" "}
              <span className="font-medium">#{trackingNumber}</span>
            </p>
          </div>
          <CredenzaFooter className="">
            <button
              onClick={() => handlePayment()}
              className="disabled:opacity-80 bg-primaryCol text-white py-2.5 px-10 w-full text-center mt-4"
              disabled={isPending}
            >
              Proceed To Pay
            </button>
          </CredenzaFooter>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
