"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Redirect = ({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [to, replace, router]);

  return null; // Render nothing
};

export default Redirect;
