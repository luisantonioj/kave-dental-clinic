import Image from "next/image";

import type { ApprovedImage } from "../../content/images";

export interface ResponsiveImageProps {
  image: ApprovedImage;
  sizes: string;
  className?: string;
  priority?: boolean;
}

export function ResponsiveImage({
  className,
  image,
  priority = false,
  sizes,
}: ResponsiveImageProps) {
  return (
    <Image
      alt={image.alt}
      className={`h-auto w-full rounded-image object-cover ${className ?? ""}`}
      height={image.height}
      priority={priority}
      sizes={sizes}
      src={image.src}
      width={image.width}
    />
  );
}
