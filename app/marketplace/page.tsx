import { Suspense } from "react";
import ProductSearch from "./_components/ProductSearch";
import LoadingFallback from "../_components/LoadingFallback";
import { generatePageMetadata } from "../_utils/metadata";
import { productFetcher } from "../_utils/server_functions/fetchers";

export const generateMetadata = async ({ params }: any) => {
  const search = params?.search || "";
  const category = params?.category || "";

  const data = await productFetcher({
    name: search,
    category,
  });

  const products = data?.products || [];
  const total = data?.total || 0;

  return generatePageMetadata({
    title: `Marketplace ${search ? `- ${search}` : ""}`,
    description: total
      ? `Browse ${total} products ${search ? `for "${search}"` : ""}`
      : `No results found ${search ? `for "${search}"` : ""}`,
    path: `/marketplace?search=${search}&category=${category}`,
    keywords: [search, category, ...products.map((p: any) => p.name)],
    imageUrl: products?.[0]?.images?.[0]?.url,
    noIndex: total === 0,
  });
};

const page = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductSearch />
    </Suspense>
  );
};

export default page;
