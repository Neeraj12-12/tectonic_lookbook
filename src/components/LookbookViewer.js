import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { Lookbook_data } from "./data";
import ProductSlider from "./ProductSlider";
import VideoPlayer from "./VideoPlayer";
import Modal from "./Modal";
import { useSwipeable } from 'react-swipeable';

const LookbookViewer = () => {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const progressInterval = useRef(null);
  const videoRef = useRef(null);
  const imageTimeoutRef = useRef(null); 

  const currentLook = Lookbook_data[currentLookIndex];

  const startImageProgress = () => {
    clearTimeout(imageTimeoutRef.current);
    imageTimeoutRef.current = setTimeout(() => {
      handleNext();
    }, 5000); 
  };

  const startProgress = () => {
    clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
    }, 100);
  };

  const handleNext = () => {
    if (currentLookIndex < Lookbook_data.length - 1) {
      setCurrentLookIndex((prev) => prev + 1);
      setSelectedProduct(null);
    } else {
      setCurrentLookIndex(0); 
    }
  };

  const handlePrevious = () => {
    if (currentLookIndex > 0) {
      setCurrentLookIndex((prev) => prev - 1);
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    if (currentLook.type === "image") {
      startImageProgress();
    } else if (currentLook.type === "video") {
      startProgress();
    }

    return () => {
      clearTimeout(imageTimeoutRef.current); 
      clearInterval(progressInterval.current); 
    };
  }, [currentLookIndex]);

  useEffect(() => {
    if (videoRef.current && isModalOpen) {
      videoRef.current.pause(); 
    } else if (currentLook.type === "video" && !isModalOpen && videoRef.current) {
      videoRef.current.play(); 
    }

    if (isModalOpen && currentLook.type === "image") {
      clearTimeout(imageTimeoutRef.current); 
    } else if (!isModalOpen && currentLook.type === "image") {
      startImageProgress(); 
    }
  }, [isModalOpen, currentLookIndex]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: handleNext,
    onSwipedDown: handlePrevious,
    preventDefaultTouchmoveEvent: true,
  });

  const handleAnnotationClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="relative h-screen w-full bg-black" {...swipeHandlers}>
      <div className="relative h-full w-full">
        <div className="relative h-full w-full flex items-center justify-center">
          {currentLook.type === "image" ? (
            <div className="relative w-full h-full">
              <img
                src={currentLook.media.url}
                alt="Look"
                className="max-h-full w-full object-contain"
              />
              {currentLook.media.products.map((product) => (
                <div
                  key={product.id}
                  className="absolute"
                  style={{
                    top: `${product.position.y}%`,
                    left: `${product.position.x}%`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleAnnotationClick(product)}
                >
                  <div className="w-6 h-6 bg-white rounded-full opacity-75 hover:opacity-100" />
                </div>
              ))}
            </div>
          ) : (
            <VideoPlayer
              key={currentLookIndex}
              ref={videoRef}
              src={currentLook.media.url}
              isMuted={isMuted}
              onEnded={handleNext}
            />
          )}

          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 text-white"
          >
            {isMuted ? (
              <VolumeX size={24} />
            ) : (
              <Volume2 size={24} />
            )}
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
            onClick={handlePrevious}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            onClick={handleNext}
          >
            <ChevronRight size={32} />
          </button>

          <ProductSlider
            products={currentLook.media.products}
            selectedProduct={selectedProduct}
            onProductClick={handleProductClick}
          />
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <Modal product={selectedProduct} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default LookbookViewer;
