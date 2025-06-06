"use client";
import clsx from "clsx";
import { CircleXIcon, FileTextIcon, HouseIcon, MenuIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathName])
  const navClasses = clsx(
    "bg-slate-900",
    "text-slate-100",
    "rounded-lg",
    "flex",
    "flex-col",
    "sm:flex-row sm:flex-wrap",
    "mb-8",
    !isOpen && "h-10",
    !isOpen && "overflow-hidden",
    "sm:overflow-visible sm:h-auto"
  );
  const linkClasses = clsx(
    "[&>svg]:w-[16px]",
    "[&>svg]:h-[16px]",
    "flex gap-2",
    "px-4",
    "transition",
    "hover:bg-slate-800",
    "items-center justify-start",
    "h-10",
    "shrink-0",
    "cursor-pointer",
    "rounded-lg"
  );

  const openCloseBtnClasses = clsx(linkClasses, "text-blue-200", "italic", "sm:hidden");
  return (
    <nav className={navClasses}>
      <button onClick={() => setIsOpen(s => !s)} className={openCloseBtnClasses}>
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>
      <a className={linkClasses} href="/" target="_blank">
        <HouseIcon />
        Home
      </a>
      <Link className={linkClasses} href={"/admin/post"}>
        <FileTextIcon />
        Posts
      </Link>
      <Link className={linkClasses} href={"/admin/post/new"}>
        <PlusIcon />
        Criar post
      </Link>
    </nav>
  );
}
