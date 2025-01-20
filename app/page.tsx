"use client";

import { runAi } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function Page() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleClick = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      const data = await runAi(query);
      setResponse(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={handleClick}>
        <Input
          className="mb-5"
          placeholder="Ask anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button>Generate with AI</Button>
      </form>
      <Card className="mt-5">
        <CardHeader>AI Response</CardHeader>
        <CardContent>{loading ? "Loading..." : response}</CardContent>
      </Card>
    </div>
  );
}
