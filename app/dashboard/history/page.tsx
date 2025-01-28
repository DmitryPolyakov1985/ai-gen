"use client";

import { getQueries } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";

interface QueryResponse {
  queries: [];
  totalPages: number;
}

const Page = () => {
  // state
  const [queries, setQueries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [loading, setLoading] = useState(false);
  // hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const res = (await getQueries(email, page, perPage)) as QueryResponse;
      const res1 = JSON.parse(JSON.stringify(res));
      setQueries(res1.queries);
      setTotalPages(res1.totalPages);
      console.log("res1 ", res1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1 && email) {
      fetchQueries();
    }
  }, [page, email]);

  return (
    <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
      <h1 className="text-xl">History</h1>
      <p className="text-sm text-gray-500">Your previous search history</p>
      {/* <pre>{JSON.stringify(queries)}</pre> */}
    </div>
  );
};

export default Page;
