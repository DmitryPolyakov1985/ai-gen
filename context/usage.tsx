"use client";

import { usageCount } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useState, useEffect } from "react";

interface UsageContextType {
  count: number;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // state
  const [count, setCount] = useState(0);
  // hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";
  console.log("email ", email);

  useEffect(() => {
    if (email) {
      fetchUsage();
    }
  }, [email]);

  const fetchUsage = async () => {
    const res = await usageCount(email);
    console.log("res ", res);

    setCount(res);
  };

  return (
    <UsageContext.Provider value={{ count }}>{children}</UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === null) {
    throw new Error(`useUsage must be used within a UsageProvider`);
  }
  return context;
};
