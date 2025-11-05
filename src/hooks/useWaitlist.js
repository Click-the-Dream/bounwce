import { axiosClient } from "../services/axios-client";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { useMutation, useQuery } from "@tanstack/react-query";
import { onFailure } from "../utils/notifications/OnFailure";
import { queryClient } from "../services/query-client";
import { extractErrorMessage } from "../utils/formatters";

const useWaitlist = () => {
  const client = axiosClient(null);

  const joinWaitlistMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await client.post("/waitlist/waitlist", credentials);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitlistUsers"] });
      onSuccess({
        title: "You're on the waitlist!",
        message: "Check your inbox for a confirmation email and updates soon.",
      });
    },
    onError: (error) => {
      console.log("error", error);
      onFailure({
        title: "Failed to join waitlist!",
        message: extractErrorMessage(error) || "Something went wrong",
      });
    },
  });

  const waitlistUserQuery = useQuery({
    queryKey: ["waitlistUsers"],
    queryFn: async () => {
      const { data } = await client.get("/waitlist/waitlist");

      return data.data;
    },
  });

  return {
    joinWaitlist: joinWaitlistMutation,
    waitlistUser: waitlistUserQuery,
  };
};

export default useWaitlist;
