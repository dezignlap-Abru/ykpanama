"use client";

interface GalleryCardProps {
  file: string;
  caption?: string;
  index: number;
}

function isVideo(f: string) {
  return /\.(mp4|mov|webm)$/i.test(f);
}

export default function GalleryCard({ file, caption, index }: GalleryCardProps) {
  if (isVideo(file)) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-[3/4] shadow-md hover:shadow-xl transition-shadow duration-300">
        <video
          className="w-full h-full object-contain bg-black"
          src={`/gallery/${file}`}
          controls
          playsInline
          preload="metadata"
        />
        {caption && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-xs font-medium text-white">{caption}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[3/4] group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/gallery/${file}`}
        alt={caption || `Camp photo ${index + 1}`}
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Fallback placeholder */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Optional caption overlay */}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 pt-10 z-10">
          <h3 className="text-white font-semibold text-sm sm:text-base">{caption}</h3>
        </div>
      )}
    </div>
  );
}
