import Link from "next/link";
import { ReactNode } from "react";

type PostHeadingProps = {
  children: ReactNode;
  url: string;
  as?: "h1" | "h2";
};

// Quando eu renomeio a prop AS como TAG eu posso usa-la como um componente no JSX
export default function PostHeading({children, url, as: Tag = "h2"}: PostHeadingProps) {
    
  const ClassesMap = {
    h1: "text-2xl/tight font-extrabold sm:text-4xl",
    h2: "text-2xl/tight font-bold line-clamp-2",
  };
  return (
    <Tag className={ClassesMap[Tag]}>
      <Link className="group-hover:text-slate-600 transition" href={url}>{children}</Link>
    </Tag>
  );
}
