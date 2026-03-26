"use client";

import { useState } from "react";
import clsx from "clsx";

type TabId = "demo" | "code";

export default function DemoTabs(props: {
  title: string;
  iframeSrc: string;
  codeTitle?: string;
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState<TabId>("demo");

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setTab("demo")}
          className={clsx(
            "px-3 py-1.5 rounded-md text-sm border",
            tab === "demo"
              ? "bg-slate-100 border-slate-200 dark:bg-gray-800 dark:border-gray-700"
              : "bg-transparent border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-gray-700 dark:hover:bg-gray-900",
          )}
        >
          Demo
        </button>
        <button
          type="button"
          onClick={() => setTab("code")}
          className={clsx(
            "px-3 py-1.5 rounded-md text-sm border",
            tab === "code"
              ? "bg-slate-100 border-slate-200 dark:bg-gray-800 dark:border-gray-700"
              : "bg-transparent border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-gray-700 dark:hover:bg-gray-900",
          )}
        >
          Code
        </button>
        <div className="ml-auto text-xs opacity-70">{props.codeTitle ?? props.title}</div>
      </div>

      {tab === "demo" ? (
        <div className="w-full aspect-[16/10] rounded-lg overflow-hidden border">
          <iframe
            title={props.title}
            src={props.iframeSrc}
            className="w-full h-full block"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock"
            allow="fullscreen"
          />
        </div>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
}

