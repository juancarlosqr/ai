"use client";

import { useFormStatus } from "react-dom";

export function Result({
  alt,
  src,
  error,
}: {
  alt?: string;
  src?: string;
  error: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="mt-10">
      {pending ? (
        <p className="text-white">⏳ Generating...</p>
      ) : error ? (
        <p className="text-white">
          😩 An error has occurred while generating your image
        </p>
      ) : (
        src && <img src={src} alt={alt} />
      )}
    </div>
  );
}
