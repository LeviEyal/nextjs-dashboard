import { fetchRevenue } from "@/app/lib/data";

export const GET = async () => {
  const data = await fetchRevenue();

  return Response.json(data);
};
