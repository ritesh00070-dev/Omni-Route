"use client";

import { useTranslations } from "next-intl";
import { CHATGPT_USAGE_URL, hasChatGptPlanScope } from "@omniroute/open-sse/config/chatgpt";
import type { ConnectionLocalUsage } from "@/shared/types/connectionLocalUsage";

export function ChatGptPlanBadge({ scopes }: { scopes: unknown }) {
  const t = useTranslations("providers");
  const permitted = hasChatGptPlanScope(scopes);
  return (
    <span
      className="rounded-full border border-neutral-400/30 px-1.5 py-0.5 text-[10px] leading-3 text-text-muted"
      title={t("chatgptPlanBadgeHint")}
    >
      {t(permitted ? "chatgptPlanLinked" : "chatgptPlanNotAuthorized")}
    </span>
  );
}

// Adapted to OmniRoute's themes from the official SIWC UI examples:
// https://developers.openai.com/siwc/ui-ux-guidelines
// Compact usage action follows the outlined pill in the SIWC devkit.
export function ChatGptManageUsageButton({ primary = false }: { primary?: boolean }) {
  const t = useTranslations("providers");
  return (
    <a
      href={CHATGPT_USAGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={t("chatgptManageUsageTitle")}
      className={`inline-flex max-w-full shrink-0 items-center justify-center gap-1 rounded-full border text-xs font-normal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
        primary
          ? "min-h-10 w-full border-black bg-black px-5 py-2.5 text-white hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-200"
          : "min-h-7 border-black/10 bg-white px-2.5 py-1 text-neutral-900 hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
      }`}
    >
      {t("chatgptManageUsage")}
      {!primary && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      )}
    </a>
  );
}

export function ChatGptMark({ large = false }: { large?: boolean }) {
  return (
    <span className={`inline-flex shrink-0 ${large ? "size-12" : "size-6"}`} aria-hidden="true">
      {/* eslint-disable @next/next/no-img-element -- bundled official SVGs */}
      <img src="/providers/chatgpt-logo-black.svg" alt="" className="size-full dark:hidden" />
      <img src="/providers/chatgpt-logo-white.svg" alt="" className="hidden size-full dark:block" />
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}

export function ChatGptPlanNotice({ connected = false }: { connected?: boolean }) {
  const t = useTranslations("providers");
  return (
    <section className="mb-5 flex min-w-0 flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <ChatGptMark />
        <div className="min-w-0 space-y-1">
          <h3 className="font-medium">{t(connected ? "chatgptUsingPlan" : "chatgptUsePlan")}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {t("chatgptPlanDescription")}
          </p>
        </div>
      </div>
      {connected && <ChatGptManageUsageButton />}
    </section>
  );
}

export function ChatGptUsageLimitNotice() {
  const t = useTranslations("providers");
  return (
    <section
      role="status"
      className="min-w-0 overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-50 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
    >
      <div className="flex items-center gap-2 border-b border-neutral-200 px-5 py-3 dark:border-neutral-700">
        <ChatGptMark /> <span className="text-sm font-medium">ChatGPT</span>
      </div>
      <div className="space-y-4 p-5">
        <h3 className="text-lg font-semibold">{t("chatgptUsageLimitReached")}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t("chatgptUsageLimitHint")}
        </p>
        <ChatGptManageUsageButton primary />
      </div>
    </section>
  );
}

export function ChatGptUsageSummary({
  limitReached = false,
  usage,
  loading = false,
  error = false,
  onRefresh,
}: {
  limitReached?: boolean;
  usage?: ConnectionLocalUsage;
  loading?: boolean;
  error?: boolean;
  onRefresh?: () => void;
}) {
  const t = useTranslations("providers");
  return (
    <div className="min-w-0 space-y-3 p-3">
      {limitReached && <ChatGptUsageLimitNotice />}
      <section className="min-w-0 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
        <h3 className="font-medium">{t("chatgptLocalUsage")}</h3>
        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
          {t("chatgptLocalUsageDescription")}
        </p>
        <dl className="my-4 grid grid-cols-3 gap-2 border-y border-neutral-200 py-4 dark:border-neutral-700">
          {(
            [
              ["chatgptUsageRequests", usage?.requests],
              ["chatgptUsageTokens", usage?.tokens],
              ["chatgptUsageDays", usage?.activeDays],
            ] as const
          ).map(([key, value]) => (
            <div key={key} className="min-w-0">
              <dt className="text-xs text-neutral-600 dark:text-neutral-400">{t(key)}</dt>
              <dd
                className="mt-2 break-words text-lg"
                aria-label={value === undefined ? t("chatgptUsageNotAvailable") : undefined}
              >
                {value === undefined ? "—" : value.toLocaleString()}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">
          {t("chatgptLocalUsageCaveat")}
        </p>
        {loading && (
          <p role="status" className="mb-2 text-xs">
            {t("chatgptLocalUsageLoading")}
          </p>
        )}
        {error && (
          <p role="alert" className="mb-2 text-xs">
            {t("chatgptLocalUsageError")}
          </p>
        )}
        {onRefresh && (
          <button
            type="button"
            disabled={loading}
            onClick={onRefresh}
            className="mb-3 text-xs underline disabled:opacity-50"
          >
            {t("chatgptLocalUsageRefresh")}
          </button>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-neutral-100 p-3 dark:bg-neutral-950">
          <span className="text-xs">{t("chatgptViewUsage")}</span>
          <ChatGptManageUsageButton />
        </div>
      </section>
    </div>
  );
}

export function ChatGptPlanWelcome({ onDismiss }: { onDismiss: () => void }) {
  const t = useTranslations("providers");
  return (
    <section className="mx-auto max-w-md space-y-5 rounded-3xl border border-neutral-200 bg-neutral-50 p-8 text-center text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
      <ChatGptMark large />
      <h3 className="text-xl font-medium">{t("chatgptWelcomeTitle")}</h3>
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {t("chatgptWelcomeDescription")}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className="min-h-10 w-full rounded-full bg-black px-5 py-2 text-sm text-white hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-200"
      >
        {t("chatgptGotIt")}
      </button>
    </section>
  );
}
