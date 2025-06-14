import clsx from "clsx";
import { ComponentProps } from "react";

type ButtonVariants = "default" | "ghost" | "danger";
type ButtonSizes = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
} & ComponentProps<"button">;

export default function Button({
  variant = "default",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx("bg-blue-600 text-blue-100 hover:bg-blue-700"),
    ghost: clsx("bg-slate-300 text-slate-900 hover:bg-slate-400"),
    danger: clsx("bg-red-600 text-red-100 hover:bg-red-700"),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx(
      "text-xs/tight",
      "py-1",
      "px-2",
      "rounded-sm",
      "[&_svg]:w-3 [&_svg]:h-3 gap-1"
    ),
    md: clsx(
      "text-base/tight",
      "py-2",
      "px-4",
      "rounded-md",
      "[&_svg]:w-4 [&_svg]:h-4 gap-2"
    ),
    lg: clsx(
      "text-lg/tight",
      "py-4",
      "px-6",
      "rounded-lg",
      "[&_svg]:w-5 [&_svg]:h-5 gap-3"
    ),
  };

  const buttonClasses = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    "flex items-center justify-center", 
    "cursor-pointer",
    "transition",
    "disabled:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-200",
    props.className,
  );
  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  );
}
