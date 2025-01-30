"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Copy, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import template from "@/utils/template";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { runAi, saveQuery } from "@/actions/ai";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Template } from "@/utils/types";

const Page = ({ params }: { params: { slug: string } }) => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const { slug } = params;
  const t = template.find((temp) => temp.slug === slug) as Template;
  // state
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  // ref
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (content) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(content);
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await runAi(t.aiPrompt + query);
      setContent(data);
      // save to db
      await saveQuery(t, email as string, query, data);
    } catch (error) {
      setContent("An error occured. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const editorInstance = editorRef.current.getInstance();
    const c = editorInstance.getMarkdown();
    try {
      await navigator.clipboard.writeText(c);
      toast.success("Content copied to clipboard.");
    } catch (error) {
      toast.error("An error occured. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-between m-5">
        <Link href="/dashboard">
          <Button>
            <ArrowLeft />
            <span className="ml-1">Back</span>
          </Button>
        </Link>
        <Button onClick={handleCopy}>
          <Copy />
          <span className="ml-1">Copy</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
          <div className="flex flex-col gap-3">
            <Image src={t.icon} alt={t.name} width={50} height={50} />
            <h2 className="font-medium text-lg">{t.name}</h2>
            <p className="text-gray-500">{t.desc}</p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            {t?.form.map((item, idx) => (
              <div key={item.name} className="my-2 flex flex-col gap-2 mb-7">
                <label className="font-bold pb-5">{item.label}</label>
                {item.field === "input" ? (
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setQuery(e.target.value)
                    }
                    name={item.name}
                    required={item.required}
                  />
                ) : (
                  <Textarea
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setQuery(e.target.value)
                    }
                    name={item.name}
                    required={item.required}
                  />
                )}
              </div>
            ))}
            <Button type="submit" className="w-full py-6" disabled={loading}>
              {loading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                "Generate Content"
              )}
            </Button>
          </form>
        </div>
        <div className="col-span-2">
          <Editor
            ref={editorRef}
            initialValue="Generated content will appear here"
            previewStyle="vertial"
            initialEditType="wysiwyg"
            height="600px"
            useCommandSHortcut={true}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
