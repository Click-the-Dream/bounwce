import { generatePageMetadata } from "@/app/_utils/metadata";
import LoginComponents from "../_components/LoginComponent";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Login - Bouwnce",
  description:
    "Access your account and manage your store with ease. Log in to Bouwnce to view your dashboard, track orders, and customize your store settings. Your gateway to seamless e-commerce management starts here.",
});
const page = () => {
  return <LoginComponents />;
};

export default page;
