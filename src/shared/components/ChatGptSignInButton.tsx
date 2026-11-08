"use client";

import type { ButtonHTMLAttributes } from "react";
import { useTranslations } from "next-intl";

type Props = {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  busy?: boolean;
  opensDialog?: boolean;
  intent?: "signin" | "continue";
};

// Official SIWC wording and logo: https://developers.openai.com/siwc/website
// Deliberately independent of OmniRoute's gradient/primary-color button styling.
export default function ChatGptSignInButton({
  href,
  onClick,
  disabled,
  busy,
  opensDialog,
  intent = "signin",
}: Props) {
  const t = useTranslations("chatgptSignIn");
  const className =
    "inline-flex min-h-11 max-w-full items-center justify-center gap-2.5 rounded-xl border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200";
  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- bundled official SVGs, no image optimization needed */}
      <img
        src="/providers/chatgpt-logo-white.svg"
        alt=""
        width={21}
        height={21}
        className="shrink-0 dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- matching official asset for the dark theme */}
      <img
        src="/providers/chatgpt-logo-black.svg"
        alt=""
        width={21}
        height={21}
        className="hidden shrink-0 dark:block"
      />
      <span>{t(intent === "continue" ? "continue" : "signIn")}</span>
    </>
  );
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }
  const popup: ButtonHTMLAttributes<HTMLButtonElement>["aria-haspopup"] = opensDialog
    ? "dialog"
    : undefined;
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      aria-haspopup={popup}
    >
      {content}
    </button>
  );
}
