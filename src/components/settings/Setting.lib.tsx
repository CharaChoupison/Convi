"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "../global/Logo";
import { Paintbrush, Settings, X } from "lucide-react";

export default function Setting() {
  const [open, setOpen] = useState("closed");
  const [content, setContent] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  function ToggleOpen() {
    if (open === "closed") {
      setOpen("open");
    } else {
      setOpen("closed");
    }
  }

  function ChangeContent(contentPage: string) {
    if (contentPage === "Setting") {
      setContent("Setting");
    } else if (contentPage === "") {
      setContent(contentPage);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open === "open" &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen("closed");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav
      className="fixed right-9 bottom-9 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-(--clr-muted) bg-(--clr-bg) transition-all duration-400 ease-in-out"
      onClick={ToggleOpen}
      ref={menuRef}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full hover:bg-(--clr-muted-alt)">
        <Logo className="h-4 w-4 fill-(--clr-text)" />
      </span>
      {open === "open" && (
        <div
          className="absolute right-0 bottom-13 min-w-60 flex-col items-end justify-center divide-y-2 divide-(--clr-muted-alt) rounded-lg border border-(--clr-muted-alt) bg-(--clr-bg) shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {content === "" ? (
            <>
              <SettingInfo />
              <SettingButton
                link="Profile"
                label="Edit Theme"
                icon={<Paintbrush className="settingIcon" />}
                css=""
              />
              <SettingButton
                link="Setting"
                label="Open Settings"
                icon={<Settings className="settingIcon" />}
                css=""
              />
            </>
          ) : content === "Setting" ? (
            <>
              <SettingTitle name="Settings" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  ChangeContent("");
                }}
                className="text-red-500"
              >
                X
              </button>
            </>
          ) : (
            <div className="p-4">{content}</div>
          )}
        </div>
      )}
    </nav>
  );

  function SettingTitle({ name }: { name: string }) {
    return (
      <div className="flex flex-row items-center justify-between px-4 py-2 text-lg font-semibold text-(--clr-text)">
        {name}
        <X />
      </div>
    );
  }

  function SettingInfo() {
    return (
      <div className="p-4 text-sm text-(--clr-text)/70">
        <h2 className="mb-2 text-lg font-semibold text-(--clr-text)">
          Settings
        </h2>
        <p>
          Customize your experience by adjusting the settings below. Click on
          any option to modify it.
        </p>
      </div>
    );
  }

  function SettingButton({
    link,
    label,
    icon,
    css,
  }: {
    link: string;
    label: string;
    icon?: React.ReactNode;
    css?: string;
  }) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          ChangeContent(link);
        }}
        className={`flex w-full cursor-pointer items-center justify-between border-(--clr-muted) bg-(--clr-bg) px-3 py-2 text-sm text-(--clr-text) transition-colors duration-300 ease-in-out first:rounded-t-lg last:rounded-b-lg hover:bg-(--clr-muted) ${css}`}
      >
        {icon}
        {label}
      </button>
    );
  }
}
