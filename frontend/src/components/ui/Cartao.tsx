interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Cartao({ className = "", children }: Props) {
  return (
    <div
      className={
        "rounded-2xl bg-white dark:bg-gray-900/80 shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.35)] " +
        "backdrop-blur-sm border border-gray-200/60 dark:border-gray-800 p-6 transition-all " +
        className
      }
    >
      {children}
    </div>
  );
}
