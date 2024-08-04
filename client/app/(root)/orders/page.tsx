import { Filter, PageTitle } from "@/components/helpers";
import { DataTable } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ordersTableHeaders } from "@/lib/data";
import { Download } from "lucide-react";

const OrdersPage = () => {
  return (
    <section className="section">
      <PageTitle title="Orders" desc="Track and manage your orders from here" />
      <div className="mt-8">
        <div className="mb-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg py-3 px-5 w-full flex items-center justify-end gap-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-primaryCol hover:bg-primaryCol/80 dark:bg-primaryCol dark:hover:bg-primaryCol/80 text-darkText hover:text-darkText center gap-x-2"
          >
            <Download className="size-4" />
            Export
          </Button>
          <Filter isOrders />
        </div>
        <DataTable headers={ordersTableHeaders} isOrders />
      </div>
    </section>
  );
};

export default OrdersPage;
