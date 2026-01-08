import React from "react";

const photos = [
  { id: 1, src: "/photos/photo1.jpg", rotation: -5, caption: "Memory 1 💕" },
  { id: 2, src: "/photos/photo2.jpg", rotation: 3, caption: "Memory 2 ✨" },
  { id: 3, src: "/photos/photo3.jpg", rotation: -2, caption: "Memory 3 🌸" },
  { id: 4, src: "/photos/photo4.jpg", rotation: 4, caption: "Memory 4 💖" },
  { id: 5, src: "/photos/photo5.jpg", rotation: -3, caption: "Memory 5 🎀" },
];

const PhotosApp = () => {
  return (
    <div className="h-full">
      <h2 className="font-pixel text-xl text-primary mb-4">📸 My Photos</h2>

      <div className="flex flex-wrap gap-6 justify-center p-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="polaroid cursor-pointer hover:scale-105 transition-transform duration-300"
            style={{ "--rotation": `${photo.rotation}deg` } as React.CSSProperties}
          >
            {/* Real image */}
            <div
              className="w-32 h-32 rounded-sm overflow-hidden bg-gray-200"
              style={{
                backgroundImage: `url(${photo.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <p className="text-center text-sm mt-2 text-gray-600 font-varela">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-6">
        Click to view full size! 🖼️
      </p>
    </div>
  );
};

export default PhotosApp;
