import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Premium laptop device chrome — 16:10 screen on a tapered base. */
export default function LaptopFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      {/* lid + screen */}
      <div className="relative rounded-t-2xl bg-gradient-to-b from-[#26252e] to-[#16151c] p-[10px] pb-[12px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        {/* camera */}
        <span className="absolute top-[5px] left-1/2 z-20 size-1 -translate-x-1/2 rounded-full bg-[#4a4956]" />
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#0a0908]">
          {children}
        </div>
      </div>
      {/* base / deck */}
      <div className="relative mx-auto h-[14px] w-[112%] -translate-x-[5.4%] rounded-b-xl bg-gradient-to-b from-[#1c1b22] to-[#0d0c11] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.7)]">
        <span className="absolute top-0 left-1/2 h-[5px] w-[110px] -translate-x-1/2 rounded-b-lg bg-black/45" />
      </div>
    </div>
  );
}
