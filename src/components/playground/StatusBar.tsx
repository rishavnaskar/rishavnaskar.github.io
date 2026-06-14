import { cn } from "@/lib/utils";

/** Tiny iOS-style status bar used inside the phone mockups. */
export default function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "bg-white/85" : "bg-black/80";
  const t = dark ? "text-white/85" : "text-black/80";
  return (
    <div className="flex items-center justify-between px-4 pt-2 pb-1">
      <span className={cn("text-[10px] font-semibold", t)}>9:41</span>
      <div className="flex items-center gap-1">
        {[3, 5, 7, 9].map((h) => (
          <span key={h} className={cn("w-[2px] rounded-full", c)} style={{ height: h }} />
        ))}
        <span className={cn("ml-1 h-[9px] w-[16px] rounded-[3px] border", dark ? "border-white/70" : "border-black/60")}>
          <span className={cn("m-[1.5px] block h-[5px] w-[9px] rounded-[1px]", c)} />
        </span>
      </div>
    </div>
  );
}
