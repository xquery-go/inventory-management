import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageTitle } from "@/components/helpers";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { orderDetailsHeaders } from "@/lib/data";

const OrderTrackPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const orderDetails = {
    products: [
      {
        id: "1",
        name: "Adidas Shoes",
        quantity: 2,
        image: "/images/shoe 1.jpg",
        price: 50,
      },
      {
        id: "1",
        name: "Adidas Shoes",
        quantity: 2,
        image: "/images/shoe 1.jpg",
        price: 50,
      },
    ],
    customer: {
      name: "John Doe",
      email: "john@gmail.com",
      phone: "1234567890",
      address: "123, Lorem Ipsum, Dolor Sit, Amet",
    },
    totalBill: "100",
    couponCode: "N/A",
    discount: "0",
    shippingAddress: "123, Lorem Ipsum, Dolor Sit, Amet",
    billingAddress: "123, Lorem Ipsum, Dolor Sit, Amet",
    paymentMethod: "Cash on Delivery",
    status: "pending",
  };
  return (
    <section className="section">
      <div className="flex items-center gap-x-3">
        <PageTitle title={`Order #${id}`} />
        <div
          className={cn(
            "text-sm rounded-full capitalize text-text py-1 px-3 font-roboto shadow-sm border",
            orderDetails.status === "pending"
              ? "bg-blue-500 border-blue-500 text-darkText"
              : orderDetails.status === "completed"
              ? "bg-green-500 border-green-600"
              : orderDetails.status === "cancelled"
              ? "bg-red-500 border-red-600 text-darkText"
              : ""
          )}
        >
          {orderDetails.status}
        </div>
      </div>
      {/* Products and Details */}
      <div className="rounded-md bg-neutral-100 dark:bg-neutral-800 py-5 px-4 mt-10">
        <h3 className="text-lg font-semibold">Products Details</h3>
        <Table>
          <TableHeader>
            <TableRow className="dark:hover:bg-neutral-900 dark:border-neutral-600">
              {orderDetailsHeaders.map(({ name }, idx) => (
                <TableHead
                  key={idx}
                  className="min-w-[130px] text-text dark:text-darkText"
                >
                  {name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetails.products.map((product, idx) => (
              <TableRow
                className="dark:hover:bg-neutral-900 dark:border-neutral-800 overflow-x-hidden"
                key={idx}
              >
                <TableCell className="min-w-[250px] flex items-start gap-x-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-cover w-24 rounded-lg h-20"
                  />
                  <div className="py-2">
                    <p className="mb-1 font-medium text-text dark:text-darkText text-[16px]">
                      {product.name}
                    </p>
                    <p>
                      Color: <span className="font-medium">Blue</span>
                    </p>
                    <p>
                      Size: <span className="font-medium">42</span>
                    </p>
                  </div>
                </TableCell>
                <TableCell className="sm:text-lg">${product.price}</TableCell>
                <TableCell className="sm:text-lg">{product.quantity}</TableCell>
                <TableCell className="sm:text-lg">
                  ${product.quantity * product.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-2 pt-5 flex justify-end border-t border-neutral-300 dark:border-neutral-600">
          <div className="w-[20%]">
            <p>
              Subtotal:{" "}
              <span className="font-medium">${orderDetails.totalBill}</span>
            </p>
            <p>
              Discount:{" "}
              <span className="font-medium">${orderDetails.discount}</span>
            </p>
            <p>
              Coupon:{" "}
              <span className="font-medium">{orderDetails.couponCode}</span>
            </p>

            <p className="mt-2 pt-2 border-t-2 border-neutral-300 dark:border-neutral-600">
              Total Bill:{" "}
              <span className="font-medium">${orderDetails.totalBill}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Customer Details */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mt-10">
        <div className="md:col-span-2 rounded-md bg-neutral-100 dark:bg-neutral-800 py-5 px-4">
          <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
          <div>
            <p>
              Name:{" "}
              <span className="font-medium">{orderDetails.customer.name}</span>
            </p>
            <p>
              Phone:{" "}
              <span className="font-medium">{orderDetails.customer.phone}</span>
            </p>
            <p>
              Email:{" "}
              <span className="font-medium">{orderDetails.customer.email}</span>
            </p>
            <p>
              Address:{" "}
              <span className="font-medium">
                {orderDetails.customer.address}
              </span>
            </p>
          </div>
        </div>
        {/* Billing Address */}
        <div className="rounded-md bg-neutral-100 dark:bg-neutral-800 py-5 px-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <p>{orderDetails.shippingAddress}</p>
        </div>
        {/* Shipping Address s*/}
        <div className="rounded-md bg-neutral-100 dark:bg-neutral-800 py-5 px-4">
          <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
          <p>{orderDetails.billingAddress}</p>
        </div>
        <div className="rounded-md bg-neutral-100 dark:bg-neutral-800 py-5 px-4">
          <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
          <p>
            Method:{" "}
            <span className="font-medium">{orderDetails.paymentMethod}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderTrackPage;
