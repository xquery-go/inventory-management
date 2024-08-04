import { PageTitle } from "@/components/helpers";
import { DataTable } from "@/components/shared";
import { ordersTableHeaders } from "@/lib/data";

const OrdersPage = () => {
  return (
    <section className="section">
      <PageTitle title="Orders" desc="Track and manage your orders from here" />
      <DataTable headers={ordersTableHeaders} isOrders />
    </section>
  );
};

export default OrdersPage;
