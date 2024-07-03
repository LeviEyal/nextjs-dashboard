export default async function Page() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return <p>Invoices Page</p>;
  }