import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: number; // size in pixels
}

export const LoadingSpinner = ({
  className,
  size = 24,
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      style={{ height: "100%" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-spin"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
};