import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Premium phone device chrome. Screen content fills the rounded slot. */
export default function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/19] w-full max-w-[250px] rounded-[2.4rem] p-[10px]",
        "bg-gradient-to-b from-[#26252e] to-[#0c0b11] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      {/* side buttons */}
      <span className="absolute top-[22%] -left-[2px] h-10 w-[3px] rounded-l bg-[#3a3947]" />
      <span className="absolute top-[34%] -left-[2px] h-7 w-[3px] rounded-l bg-[#3a3947]" />
      <span className="absolute top-[26%] -right-[2px] h-14 w-[3px] rounded-r bg-[#3a3947]" />

      {/* screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-white">
        {/* notch */}
        <div className="absolute top-2 left-1/2 z-20 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}
