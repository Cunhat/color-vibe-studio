"use client";

import React from "react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
  async function logOutHandler() {
    await authClient.signOut();
  }

  return (
    <Button size="sm" onClick={() => logOutHandler()}>
      Logout
    </Button>
  );
}
