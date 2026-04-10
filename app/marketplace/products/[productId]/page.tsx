import { generatePageMetadata } from "@/app/_utils/metadata";
import ProductDetails from "../_components/ProductDetails";
import { productFetcher } from "@/app/_utils/server_functions/fetchers";
import { formatCurrency } from "@/app/_utils/formatters";

export const generateMetadata = async ({ params }: any) => {
  const { productId } = await params;

  const product = await productFetcher(productId);

  if (!product) {
    return generatePageMetadata({
      title: "Product Not Found | Bouwnce",
      description: "The requested product could not be found.",
      noIndex: true,
    });
  }

  const formattedPrice = formatCurrency(product.amount);

  return generatePageMetadata({
    title: `${product.name} - ${formattedPrice} | Bouwnce Marketplace`,
    description: `${product.description}. Available for ${formattedPrice} on Bouwnce Marketplace.`,

    path: `/marketplace/${product.id}`,

    keywords: [
      product.name,
      product.category,
      formattedPrice,
      "buy",
      "marketplace",
    ].filter(Boolean),

    imageUrl: product.images?.[0]?.url,

    noIndex: product.state !== "live",
  });
};

const page = () => {
  return <ProductDetails />;
};

export default page;
