"use client";
import { useCallback, useMemo, useState } from "react";
import { uniqBy, delay } from "es-toolkit";
import { useDebounce } from "@uidotdev/usehooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fas,
  type IconDefinition,
  faHandPointUp,
} from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";

const allIcons = uniqBy(
  [
    Object.values(fas),
    // Object.values(far),
    // Object.values(fab)
  ].flat(1),
  (f) => f.iconName
);

export type Icon = IconDefinition;

interface Props {
  onChange: (icon: Icon) => void;
}

export function IconPicker({ onChange }: Readonly<Props>) {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<null | Icon>(null);

  const debouncedSearchInput = useDebounce(searchInput, 100);
  const searchTerm = debouncedSearchInput.toLowerCase().replaceAll(" ", "-");

  const icons = useMemo(
    () =>
      allIcons.filter((icon) => {
        return icon.iconName.toLowerCase().includes(searchTerm);
      }),
    [searchTerm]
  );

  const onSelectIcon = useCallback(
    async (icon: Icon) => {
      setSelectedIcon(icon);
      onChange(icon);
      await delay(200);
      setOpen(false);
      await delay(300);
      setSearchInput("");
    },
    [onChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          <FontAwesomeIcon icon={faHandPointUp} className="mr-2" />
          Pick a icon
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Input
          placeholder="Search..."
          className="mb-5"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <ScrollArea className="w-full h-[300px]">
          {icons.length === 0 && (
            <div className="w-full">
              <h2 className="text-center">No Icons Found</h2>
            </div>
          )}
          <div className="flex gap-2 flex-wrap">
            {icons.map((icon) => (
              <Button
                key={icon.iconName}
                size="icon"
                variant={
                  icon.iconName === selectedIcon?.iconName
                    ? "default"
                    : "outline"
                }
                onClick={() => onSelectIcon(icon)}
              >
                <FontAwesomeIcon icon={icon} />
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
