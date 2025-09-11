import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lustiana } from "@/app/ui/fonts";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";
import { CardData } from "@/app/lib/definitions";

const defaultCardData: CardData = {
  totalPaidInvoices: "$0",
  totalPendingInvoices: "$0",
  numberOfInvoices: 0,
  numberOfCustomers: 0,
};

export default async function Page() {
const [revenue, latestInvoices, cardData] = await Promise.all([
  fetchRevenue().catch((err): any[] => {
    console.error("Error fetching revenue:", err);
    return [];
  }),
  fetchLatestInvoices().catch((err): any[] => {
    console.error("Error fetching latest invoices:", err);
    return [];
  }),
  fetchCardData().catch((err): CardData => {
    console.error("Error fetching card data:", err);
    return defaultCardData;
  }),
]);
  
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = cardData;
  
  return (
    <main>
      <h1 className={`${lustiana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
