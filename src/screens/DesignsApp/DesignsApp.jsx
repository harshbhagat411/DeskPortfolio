import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { designGallery } from "../../data/designGallery";

const DesignsApp = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleClose = () => {
    setActiveImageIndex(null);
  };

  const handlePrev = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? designGallery.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === designGallery.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Keyboard navigation listeners
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex]);

  return (
    <div
      className="w-full h-full overflow-y-auto bg-transparent text-zinc-900 dark:text-zinc-100 select-text scroll-smooth"
      style={{ padding: "10px" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col p-8 md:p-12">
        {/* Header Section */}
        <div className="mb-10 text-left" style={{ paddingBottom: "10px" }}>
          <h1
            className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-3"
            style={{ paddingBottom: "10px" }}
          >
            Designs
          </h1>
          <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-normal  leading-relaxed">
            A curated collection of UI/UX projects, branding, illustrations, and
            visual explorations.
          </p>
        </div>

        {/* Responsive Masonry Grid using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 [column-fill:_balance] w-full">
          {designGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleImageClick(index)}
              className="group relative break-inside-avoid mb-6 rounded-2xl overflow-hidden bg-white/5 dark:bg-black/5 border border-zinc-200/30 dark:border-white/10 shadow-md hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-all duration-300 ease-out group-hover:brightness-[1.05]"
                loading="lazy"
                draggable="false"
              />
              {/* Hover Dark Overlay with Slide-in Info */}
              <div
                style={{ marginBottom: "10px", marginLeft: "10px" }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex flex-col justify-end p-5 select-none pointer-events-none"
              >
                <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-bold mb-1">
                  {item.category}
                </span>
                <h3 className="text-white text-base md:text-lg font-semibold leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-md select-none"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer p-2.5 bg-white/10 hover:bg-white/20 rounded-full outline-none"
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-6 z-50 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer p-3 bg-white/10 hover:bg-white/20 rounded-full outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-6 z-50 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer p-3 bg-white/10 hover:bg-white/20 rounded-full outline-none"
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>

          {/* Lightbox Image Card Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] mx-auto p-4 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={designGallery[activeImageIndex].image}
              alt={designGallery[activeImageIndex].title}
              className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-white/10"
              draggable="false"
            />
            <div className="mt-5 text-center text-white">
              <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold block mb-1">
                {designGallery[activeImageIndex].category}
              </span>
              <h2 className="text-lg md:text-xl font-bold">
                {designGallery[activeImageIndex].title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignsApp;
