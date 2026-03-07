"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";

interface ImageInputProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

/**
 * Global reusable image URL input component.
 * Accepts a list of image URLs, lets the user add/remove them,
 * and shows a live preview grid. The first image is marked as "Cover".
 */
export function ImageInput({
  images,
  onChange,
  maxImages = 10,
}: ImageInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function add() {
    const trimmed = url.trim();
    if (!trimmed) return;

    // Basic URL validation
    try {
      new URL(trimmed);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    if (images.includes(trimmed)) {
      setError("This image URL has already been added.");
      return;
    }

    if (images.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed.`);
      return;
    }

    onChange([...images, trimmed]);
    setUrl("");
    setError("");
  }

  function remove(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {/* URL Input row */}
      <div className="space-y-1">
        <div className="flex gap-2">
          <Input
            placeholder="Paste image URL and press Add…"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
            className="h-10 text-sm"
          />
          <Button
            type="button"
            variant="outline"
            onClick={add}
            disabled={images.length >= maxImages}
            className="shrink-0 h-10 px-4 text-xs font-bold border-stone-200 hover:border-amber-500 hover:text-amber-700"
          >
            <ImagePlus className="w-4 h-4 mr-1.5" />
            Add
          </Button>
        </div>
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        <p className="text-[11px] text-stone-400">
          {images.length}/{maxImages} images added. First image is used as
          cover.
        </p>
      </div>

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative group rounded-xl overflow-hidden border border-stone-200 aspect-square bg-stone-50"
            >
              <Image
                src={img}
                alt={`Image ${i + 1}`}
                fill
                sizes="200px"
                className="object-cover"
                unoptimized
              />
              {/* Remove button */}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                aria-label="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
              {/* Cover badge on first image */}
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[10px] font-bold bg-amber-600 text-white px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
