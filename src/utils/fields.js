import { IoColorPaletteOutline, IoRocketOutline } from "react-icons/io5";
import { BsBox, BsTruck } from "react-icons/bs";
export const brandingSteps = [
  {
    icon: IoColorPaletteOutline,
    key: "branding",
    label: "Branding",
    desc: "Business details & verification",
    fields: ["store_description", "store_logo", "store_banner"],
  },
  {
    icon: BsBox,
    key: "products",
    label: "Products",
    desc: "Add your first product or service",
    fields: ["products"],
  },
  {
    icon: BsTruck,
    key: "shipping",
    label: "Shipping",
    desc: "Set up delivery options",
    fields: ["shipping"],
  },
  {
    icon: IoRocketOutline,
    key: "publish",
    label: "Publish",
    desc: "Make your catalogue live",
  },
];

export const onboardingTree = {
  2: {
    // Main tabs under step 2
    store: ["store_info"],
    contact: ["contact_info"],
    verification: ["id_verification"],
    payout: ["payout_info"],
  },
  3: {
    // Inner sub-steps under GettingStarted
    branding: ["branding_info"],
    products: ["products_info"],
    shipping: ["shipment_info"],
    publish: ["publish_info"],
  },
  4: {
    // Step 4 is just success
    success: [],
  },
};
