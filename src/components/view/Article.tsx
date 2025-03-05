import { Award, Lightbulb } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  type: "idea" | "case";
  href: string;
};

export const Article = ({ title, type, href }: Props) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 flex items-center">
      {type === "case" && (
        <Award className="h-5 w-5 mr-2 text-green-600 mt-1 flex-shrink-0" />
      )}
      {type === "idea" && (
        <Lightbulb className="h-5 w-5 mr-2 text-green-600 mt-1 flex-shrink-0" />
      )}
      <Link href={href} className="pt-1 hover:underline">
        {title}
      </Link>
    </div>
  );
};
