"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import type { FC } from "react";

type Props = {
  children: React.ReactNode;
  provider?: string;
};

const signinButton: FC<Props> = ({ children, provider }) => {
  return (
    <Button onClick={() => signIn(provider)} variant="outline">
      {children}
    </Button>
  );
};

export default signinButton;
