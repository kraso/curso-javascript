import { cn } from "../../lib/utils";

const variants = {
  primary: "bg-primary hover:bg-primary-dark text-dark-900 font-semibold glow hover:glow-lg",
  secondary: "bg-dark-700 hover:bg-dark-600 text-zinc-100 border border-zinc-700 hover:border-zinc-600",
  ghost: "bg-transparent hover:bg-dark-700 text-zinc-300 hover:text-zinc-100",
  outline: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-dark-900",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-8 py-3.5 text-base rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
