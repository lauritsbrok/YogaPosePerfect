import { cn } from "@/util/cn";
import React from "react";

interface YoutubeEmbedProps {
  embedId: string;
  className?: string;
}

export default function YoutubeEmbed({
  embedId,
  className,
}: YoutubeEmbedProps) {
  return (
    <iframe
      className={cn("", className)}
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  );
}
