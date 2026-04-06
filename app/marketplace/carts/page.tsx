import { generatePageMetadata } from "@/app/_utils/metadata";
import ShoppingCart from "./components/ShoppingCart";

export const metadata = generatePageMetadata({
  title: "Shopping Cart | Bouwnce",
  description: "View and manage items in your shopping cart before checkout.",
});

const page = () => {
  return <ShoppingCart />;
};

export default page;
