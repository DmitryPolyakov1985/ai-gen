import { CopyIcon, Copy } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Props } from "@/utils/types";

const wordCount = (text: string) => text.split(" ").length;

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

function QueryTable({ data }: Props) {
  console.log("data ", data);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">TEMPLATE</th>
            <th className="py-2 px-4 border-b text-left">QUERY</th>
            <th className="py-2 px-4 border-b text-left">DATE</th>
            <th className="py-2 px-4 border-b text-left">WORDS</th>
            <th className="py-2 px-4 border-b text-left">COPY</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item._id} className="hover:bg-gray-100 dark:bg-gray-700">
              <td className="py-2 px-4 border-b">
                <div className="flex ml-1">
                  <Image
                    src={item.template.icon}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                  <div className="ml-2">{item.template.name}</div>
                </div>
              </td>
              <td className="py-2 px-4 border-b sm:line-clamp-4 line-clamp-2">
                {item.query}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">{wordCount(item.content)}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleCopy(item.content)}
                  className="flex items-center"
                >
                  <Copy className=" h-5 w-5 text-gray-500 dark:text-gray-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QueryTable;
