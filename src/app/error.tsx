"use client";
import ErrorMessage from "@/components/ErrorMessage";
import clsx from "clsx";
import { useEffect } from "react";

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error, reset }: RootErrorPageProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <>
      <ErrorMessage
        pageTitle={"Internal Server Error"}
        contentTitle={"OPS 😓"}
        content={
          <>
            <p>Algo deu errado</p>
            <button
              className={clsx(
                "mt-4",
                "cursor-pointer",
                "border-1",
                "bg-slate-100",
                "text-slate-900",
                "p-2",
                "rounded-xl",
                "hover:bg-slate-900",
                "hover:text-slate-100",
                "transition"
              )}
              onClick={() => reset()}
            >
              Tentar novamente
            </button>
          </>
        }
      />
    </>
  );
}
