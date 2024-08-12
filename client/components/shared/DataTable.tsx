"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { products, ordersData, usersData } from "@/lib/data";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ConfirmationDialog, Loader, Pagination } from "../helpers";
import Link from "next/link";
import { useState } from "react";
import { IPagination, IProduct, IUser } from "@/types/types";
import { TableSkeleton } from "../skeletons";

export const DataTable = ({
  headers,
  isOrders,
  isProduct,
  isUsers,
  data,
  pagination,
  isLoading,
}: {
  headers: { name: string; key: string }[];
  isProduct?: boolean;
  isOrders?: boolean;
  isUsers?: boolean;
  data: any;
  pagination: IPagination;
  isLoading: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("delete");

  return (
    <div className="w-full">
      <div className="max-h-[58vh] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow className="dark:hover:bg-neutral-900 dark:border-neutral-800">
              {headers.map(({ name }, idx) => (
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
            {isLoading ? (
              <>
                {headers.map((_, idx) => (
                  <TableRow
                    className="dark:hover:bg-neutral-900 dark:border-neutral-800"
                    key={idx}
                  >
                    {headers.map((_, idx) => (
                      <TableCell key={idx}>
                        <TableSkeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {isProduct && data.length > 0
                  ? data.map((product: IProduct, idx: number) => (
                      <TableRow
                        className="dark:hover:bg-neutral-900 dark:border-neutral-800 overflow-x-hidden"
                        key={idx}
                      >
                        <TableCell className="min-w-[250px] flex items-center gap-x-2">
                          {product.imageUrls &&
                            product.imageUrls.length > 0 && (
                              <Image
                                src={product.imageUrls[0]}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="object-cover w-[80px] rounded-lg h-[50px]"
                              />
                            )}
                          <p className="text-text dark:text-darkText">
                            {product.name}
                          </p>
                        </TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.rating}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>
                          {" "}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="icon"
                                variant="outline"
                                className=""
                              >
                                <EllipsisVertical />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="flex flex-col gap-y-2"
                            >
                              <Link href={`/products/update/12`}>
                                <DropdownMenuItem role="link">
                                  Update
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem
                                onClick={() => {
                                  setOpen(true);
                                  setAlertType("delete");
                                }}
                                className="bg-red-500 focus:bg-red-600 focus:text-darkText dark:focus:bg-red-600 text-darkText"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  : isProduct && (
                      <TableRow>
                        <TableCell
                          colSpan={headers.length}
                          className="text-start text-3xl pt-10"
                        >
                          No products found
                        </TableCell>
                      </TableRow>
                    )}

                {isOrders &&
                  ordersData.map((order, idx) => (
                    <TableRow
                      className="dark:hover:bg-neutral-900 dark:border-neutral-800 overflow-x-hidden"
                      key={idx}
                    >
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell
                        className={`font-medium ${
                          order.status === "Pending"
                            ? "text-blue-500"
                            : order.status === "Delivered"
                            ? "text-green-500"
                            : order.status === "Cancelled"
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {order.status}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline" className="">
                              <EllipsisVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="flex flex-col gap-y-2"
                          >
                            <Link href={`/orders/12`}>
                              <DropdownMenuItem role="link">
                                View Details
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem role="link">
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setOpen(true);
                                setAlertType("cancel");
                              }}
                              className="bg-red-500 focus:bg-red-600 focus:text-darkText dark:focus:bg-red-600 text-darkText"
                            >
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}

                {isUsers && data.length > 0
                  ? data.map((user: IUser, idx: number) => (
                      <TableRow
                        className="dark:hover:bg-neutral-900 dark:border-neutral-800 overflow-x-hidden"
                        key={idx}
                      >
                        <TableCell className="min-w-[250px] flex items-center gap-x-2">
                          <Image
                            src={user.avatar || "/images/dummy-user.webp"}
                            alt={user.name}
                            width={200}
                            height={200}
                            className="object-cover size-10 rounded-full"
                          />
                          <p className="text-text dark:text-darkText">
                            {user.name}
                          </p>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.address || "N/A"}</TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                      </TableRow>
                    ))
                  : isUsers && (
                      <TableRow>
                        <TableCell
                          colSpan={headers.length}
                          className="text-start text-3xl pt-10"
                        >
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && <Pagination data={pagination} />}
      <ConfirmationDialog open={open} setOpen={setOpen} alertType={alertType} />
    </div>
  );
};
