import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ light = false, className = "" }) {
  return (
    <Link
      href="/"
      aria-label="The Style Edit home"
      className={cn(
        "group inline-flex flex-col items-center text-center",
        light ? "text-ivory" : "text-espresso",
        className,
      )}
    >
      <span className="font-serif text-[1.8rem] font-medium leading-none tracking-[-0.04em] sm:text-[2.05rem]">
        The Style <span className="font-normal italic">Edit</span>
      </span>
      <span
        className={cn(
          "mt-1.5 block font-sans text-[0.46rem] font-semibold uppercase tracking-[0.32em] transition-colors duration-300 group-hover:text-camel",
          light ? "text-ivory/60" : "text-caramel",
        )}
      >
        A year-round style journal
      </span>
    </Link>
  );
}
