import VerifyAccount from "../_components/EmailVerification";
import { Metadata } from "next";
import { generatePageMetadata } from "@/app/_utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Verify Your Account",
  description: "Enter the code sent to your email to verify your account.",
});

const Page = () => {
  return <VerifyAccount />;
};

export default Page;
