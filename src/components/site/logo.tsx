import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Surface the logo sits on — picks the correct color variant automatically */
  surface?: "dark" | "light";
  /** Height in px. Width auto-scales to preserve aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * ClickTake Technologies brand logo.
 * - `surface="dark"` (our app theme) → uses the white-text logo (logo-white.png)
 * - `surface="light"` → uses the black-text logo (logo-dark.png)
 *
 * The logo is a full horizontal lockup: icon + "CLICKTAKE" wordmark +
 * "TECHNOLOGIES" + the tagline "Connecting in a better way".
 */
export function Logo({
  surface = "dark",
  height = 40,
  className,
  priority = false,
}: LogoProps) {
  const src = surface === "dark" ? "/logo-white.png" : "/logo-dark.png";
  // The source PNG is a 512×512 square lockup. We display it as a compact
  // horizontal wordmark by constraining height and letting width follow.
  const width = Math.round(height * 2.6);

  return (
    <Image
      src={src}
      alt="ClickTake Technologies — Connecting in a better way"
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}
