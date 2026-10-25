import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "This page could not be found. Return to The Style Edit for everyday outfit inspiration.",
  alternates: {},
};

export default function NotFound() {
  return (
    <div className="container-editorial flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404 / Off the path</p>
      <h1 className="display-title mt-5 max-w-3xl text-[4rem] sm:text-[6rem]">
        This outfit wandered <span className="italic">off the page.</span>
      </h1>
      <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-charcoal/70">
        The page you were looking for is not here. The edit is still waiting, though. Start again
        with the latest story or browse every outfit category.
      </p>
      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <Link href="/" className="button-primary">
          Return home
          <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
        </Link>
        <Link href="/categories/" className="button-secondary">
          Browse categories
        </Link>
      </div>
    </div>
  );
}
