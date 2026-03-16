import { ReactNode } from "react";

export default function DashedContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border-2 border-dashed border-[#93b5cf] p-6 sm:p-8 ${className}`}>
      {/* Corner brackets */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#93b5cf] -translate-x-px -translate-y-px" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#93b5cf] translate-x-px -translate-y-px" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#93b5cf] -translate-x-px translate-y-px" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#93b5cf] translate-x-px translate-y-px" />
      {children}
    </div>
  );
}
