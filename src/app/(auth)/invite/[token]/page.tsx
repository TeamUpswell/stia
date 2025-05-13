"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const InvitePage = () => {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  useEffect(() => {
    const acceptInvite = async () => {
      if (token) {
        const { data, error } = await supabase
          .from("invitations")
          .select("*")
          .eq("token", token)
          .single();

        if (error) {
          console.error("Error fetching invitation:", error);
          return;
        }

        if (data) {
          // Handle the invitation acceptance logic here
          console.log("Invitation accepted:", data);
        }
      }
    };

    acceptInvite();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Accept Invitation</h1>
      <p className="mt-4">Processing your invitation...</p>
    </div>
  );
};

export default InvitePage;
