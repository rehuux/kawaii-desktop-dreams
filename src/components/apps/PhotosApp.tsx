import React, { useState } from "react";
import { X, ZoomIn, ZoomOut, Maximize, ChevronLeft, ChevronRight, Download } from "lucide-react";

const photos = [
  { id: 1, src: "/photos/photo1.jpg", rotation: -5, caption: "Oct 2024" },
  { id: 2, src: "/photos/photo2.jpg", rotation: 3, caption: "Nov 2023" },
  { id: 3, src: "/photos/photo3.jpg", rotation: -2, caption: "Your eyes 🫠" },
  { id: 4, src: "/photos/photo4.jpg", rotation: 4, caption: "Eid 2024" },
  { id: 5, src: "/photos/photo5.jpg", rotation: -3, caption: "Your Smile" },
];

const PhotosApp = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const openPhoto = (index: number) => {
    setSelectedIndex(index);
    setZoom(1);
  };

  const closeViewer = () => {
    setSelectedIndex(null);
    setZoom(1);
  };

  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % photos.length);
    setZoom(1);
  };

  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    setZoom(1);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const handleDownload = () => {
    if (selectedIndex === null) return;
    const link = document.createElement("a");
    link.href = photos[selectedIndex].src;
    link.download = `photo-${photos[selectedIndex].id}.jpg`;
    link.click();
  };

  return (
    <div className="h-full">
      <h2 className="font-pixel text-xl text-primary mb-4">Your Photos</h2>

      <div className="flex flex-wrap gap-6 justify-center p-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openPhoto(index)}
            className="polaroid cursor-pointer hover:scale-105 transition-transform duration-300"
            style={{ "--rotation": `${photo.rotation}deg` } as React.CSSProperties}
          >
            <div
              className="w-32 h-32 rounded-sm overflow-hidden bg-muted"
              style={{
                backgroundImage: `url(${photo.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="text-center text-sm mt-2 text-muted-foreground font-varela">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-6">
        Click to view full size! 🖼️
      </p>

      {/* Fullscreen Photo Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center animate-fade-in">
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 z-10">
            <span className="font-pixel text-white/80 text-sm">
              {photos[selectedIndex].caption} — {selectedIndex + 1}/{photos.length}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <ZoomOut className="w-4 h-4 text-white" />
              </button>
              <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <ZoomIn className="w-4 h-4 text-white" />
              </button>
              <button onClick={handleDownload} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Download className="w-4 h-4 text-white" />
              </button>
              <button onClick={toggleFullscreen} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Maximize className="w-4 h-4 text-white" />
              </button>
              <button onClick={closeViewer} className="p-2 rounded-full bg-white/10 hover:bg-red-500/60 transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Navigation arrows */}
          <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <img
            src={photos[selectedIndex].src}
            alt={photos[selectedIndex].caption}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption */}
          <p className="font-pixel text-white/70 text-sm mt-4">{photos[selectedIndex].caption}</p>
        </div>
      )}
    </div>
  );
};

export default PhotosApp;
