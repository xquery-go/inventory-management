import { PageTitle } from "@/components/helpers";

const OrderTrackPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <section className="section">
      <PageTitle title="Orders" />
    </section>
  );
};

export default OrderTrackPage;
