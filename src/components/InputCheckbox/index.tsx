import clsx from "clsx";
import { ComponentProps, useId } from "react";

type InputCheckboxProps = {
  labelText?: string;
  type?:'checkbox'
} & ComponentProps<"input">;

export default function InputCheckbox({ labelText='', type='checkbox', ...props }: InputCheckboxProps) {
  const id = useId();
  return (
    <div className="flex gap-3 items-center">
      <input
        {...props}
        id={id}
        className={clsx(
          "w-4 h-4",
          "outline-none",
          "rounded-lg",
          "focus:ring-2 focus:ring-slate-700",
          props.className
        )}
        type={type}
      />
      {labelText && <label htmlFor={id}>{labelText}</label>}
    </div>
  );
}
