import RegistrationComponent from "../_components/RegistrationComponent";
import { generatePageMetadata } from "@/app/_utils/metadata";

export const metadata = generatePageMetadata({
  title: "Register - Bouwnce",
  description:
    "Join Bouwnce today and unlock a world of e-commerce possibilities. Create your account to start building your online store, showcasing your products, and reaching customers across Nigeria. Sign up now and take the first step towards growing your business with Bouwnce.",
});

const page = () => {
  return <RegistrationComponent />;
};

export default page;
