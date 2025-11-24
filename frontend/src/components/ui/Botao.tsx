interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Botao({ children, className = "", disabled, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={
        "inline-flex items-center justify-center gap-2 font-medium rounded-xl px-4 py-2 text-sm " +
        "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 " +
        "disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md " +
        className
      }
    >
      {children}
    </button>
  );
}
