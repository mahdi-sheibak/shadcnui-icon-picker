"use client";

import { IconPicker, type Icon } from "@/components/icon-picker";
import { useState } from "react";

export default function Home() {
  const [icon, setIcon] = useState<null | Icon>(null);

  return (
    <main className="flex flex-col items-center mt-5">
      <IconPicker
        onChange={(icon) => {
          setIcon(icon);
        }}
      />

      <div className="mt-5">
        {icon && (
          <span>
            class name: {icon?.prefix} {icon?.iconName}
          </span>
        )}
      </div>
    </main>
  );
}
