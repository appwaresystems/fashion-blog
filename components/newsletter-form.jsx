"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || "";

export function NewsletterForm() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (!endpoint) {
      setStatus("preview");
      setMessage(
        "This is a preview. Your address was not saved and no email was sent. Connect a newsletter provider to collect signups.",
      );
      form.reset();
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      setStatus("success");
      setMessage("You are on the list. Look for the next seasonal letter in your inbox.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "The signup service could not be reached. Please try again in a moment or contact the editor.",
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Your email address"
            className="min-h-12 w-full border border-ivory/35 bg-transparent px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/50 focus:border-ivory focus:outline-none focus:ring-0"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 items-center justify-center gap-3 border border-ivory bg-ivory px-7 py-3 font-sans text-[0.66rem] font-semibold uppercase tracking-editorial text-espresso transition duration-300 ease-editorial hover:border-camel hover:bg-camel hover:text-ivory disabled:cursor-wait disabled:opacity-60"
        >
          {status === "success" ? (
            <Check aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          )}
          {status === "loading" ? "Joining" : "Join the letter"}
        </button>
      </form>
      <div aria-live="polite" className="min-h-6">
        {message ? (
          <p
            className={`mt-3 max-w-xl font-sans text-xs leading-5 ${
              status === "error" ? "text-[#f2c9c9]" : "text-ivory/70"
            }`}
          >
            {message}
          </p>
        ) : (
          <p className="mt-3 max-w-xl font-sans text-xs leading-5 text-ivory/55">
            A design preview with no active email service. No address is stored until an endpoint is
            connected.
          </p>
        )}
      </div>
    </div>
  );
}
