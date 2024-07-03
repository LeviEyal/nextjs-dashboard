import Link from "next/link";

export default async function Page() {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return <div>
        <h1>Customers</h1>
        <p>Customers Page</p>
        <Link href="/dashboard/invoices">to invoices</Link>
    </div>;
  }