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
import { products, productTableHeaders } from "@/lib/data";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Pagination } from "../helpers";
import Link from "next/link";

export const DataTable = () => {
  return (
    <div className="w-full mt-8">
      <div className="max-h-[58vh] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow className="dark:hover:bg-neutral-900 dark:border-neutral-800">
              {productTableHeaders.map(({ name }, idx) => (
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
            {products.map((product, idx) => (
              <TableRow
                className="dark:hover:bg-neutral-900 dark:border-neutral-800 overflow-x-hidden"
                key={idx}
              >
                <TableCell className="min-w-[250px] flex items-center gap-x-2">
                  <Image
                    src={product.img}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-cover w-[80px] rounded-lg h-[50px]"
                  />
                  <p className="text-text dark:text-darkText">
                    {product.title}
                  </p>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.ratings}</TableCell>
                <TableCell>{product.itemsSold}</TableCell>
                <TableCell>
                  {" "}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/products/update/12`}>
                        <DropdownMenuItem role="link">Update</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="bg-red-500 focus:bg-red-600 focus:text-darkText dark:focus:bg-red-600 text-darkText">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination />
    </div>
  );
};
