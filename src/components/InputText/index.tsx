import clsx from "clsx";
import { ComponentProps, useId } from "react";

type InputTextProps = {
  labelText?: string;
} & ComponentProps<"input">;

export default function InputText({ labelText, ...props }: InputTextProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        {...props}
        id={id}
        className={clsx(
          "bg-white",
          "outline-0",
          "ring-2",
          "ring-slate-400",
          "rounded",
          "py-2",
          "px-2",
          "transition",
          "focus:ring-slate-700",
          "placeholder-slate-300",
          "disabled:bg-slate-200 disabled:placeholder-slate-400 disabled:text-slate-400",
          "read-only:bg-slate-100 read-only:text-slate-700 read-only:placeholder-slate-700",
          props.className
        )}
      />
    </div>
  );
}
