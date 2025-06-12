import MenuAdmin from "@/components/Admin/MenuAdmin";
import { requireLoginSessionOrRedirect } from "@/lib/login/manage-login";
import { ReactNode } from "react";

type AdminPostLayoutProps = {
  children: ReactNode;
};

export default async function AdminPostLayout({ children }: Readonly<AdminPostLayoutProps>) {
  await requireLoginSessionOrRedirect()
  
  return (
    <>
    <MenuAdmin/>
    {children}
    </>
  );
}
