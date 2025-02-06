"use client";

import { useUsage } from "@/context/usage";
import { Button } from "../ui/button";

function Usage() {
  const { count } = useUsage();
  const credits = 10000;
  const percentage = (count / credits) * 100;

  return (
    <div className="m-2">
      <div className="rounded-lg shadow border p-2">
        <h2 className="font-medium">Credits {count}</h2>
        <div className="h-2 bg-slate-500 w-full rounded-full mt-3">
          <div
            className="h-2 bg-slate-200 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {count} / {credits} credits used
        </h2>
      </div>
      <Button className="w-full my-3" variant="secondary">
        Upgrade
      </Button>
    </div>
  );
}

export default Usage;
