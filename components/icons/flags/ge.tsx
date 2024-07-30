import { cn } from "@/lib/utils";

export const GeIcon = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 24"
      className={cn(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 16H32V24H0V16Z"
          fill="#FFD018"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 8H32V16H0V8Z"
          fill="#E31D1C"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H32V8H0V0Z"
          fill="#272727"
        />
      </g>
    </svg>
  );
};
