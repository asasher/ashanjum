"use client";

import { useEffect, useState } from "react";

/** Live Dubai clock for the footer. Renders the static zone label until mounted. */
export function DubaiTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Dubai",
        }).format(new Date()),
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span>Dubai · {time ?? "GST+4"}</span>;
}
