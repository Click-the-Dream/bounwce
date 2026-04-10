import { generatePageMetadata } from "../_utils/metadata";
import Waitlist from "./_components/Waitlist";

export const metadata = generatePageMetadata({
  title: "Join the Bouwnce Waitlist – Discover, Connect, Experience",
  description:
    "Be the first to experience Bouwnce. Join the waitlist to discover events, connect with like-minded people, and explore new experiences around you.",
});

const page = () => {
  return <Waitlist />;
};

export default page;
