import { generatePageMetadata } from "@/app/_utils/metadata";
import BuyerLayout from "./_components/BuyerLayout";

export const metadata = generatePageMetadata({
  title: "Buyer Dashboard | Bouwnce",
  description:
    "Explore events, connect with people, track your activity, and manage your profile from your Bouwnce buyer dashboard.",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return <BuyerLayout children={children} />;
};

export default layout;
