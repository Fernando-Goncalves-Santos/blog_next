import MenuAdmin from "@/components/Admin/MenuAdmin";
import { ReactNode } from "react";

type AdminPostLayoutProps = {
  children: ReactNode;
};

export default function AdminPostLayout({ children }: Readonly<AdminPostLayoutProps>) {
  return (
    <>
    <MenuAdmin/>
    {children}
    </>
  );
}
