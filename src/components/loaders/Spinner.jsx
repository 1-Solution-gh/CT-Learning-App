import { Loader2 } from "lucide-react";

export function Spinner({ className = "", size = "default" }) {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6", 
    large: "h-8 w-8"
  };

  return (
    <div className="flex justify-center items-center">
      <Loader2 
        className={`animate-spin ${sizeClasses[size]} ${className}`}
      />
    </div>
  );
}
