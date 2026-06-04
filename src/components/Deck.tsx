import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageSquareText, Maximize } from 'lucide-react';
import { slides } from '../data/slidesData';
import SlideRenderer from './SlideRenderer';

export default function Deck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Standard 16:9 Presentation Format
  const BASE_WIDTH = 1200;
  const BASE_HEIGHT = 675;

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const scaleX = clientWidth / BASE_WIDTH;
        const scaleY = clientHeight / BASE_HEIGHT;
        const uniformScale = Math.min(scaleX, scaleY) * 0.95; // 95% of available space
        setScale(uniformScale);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowNotes(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(c => Math.min(c + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide(c => Math.max(c - 1, 0));
  };
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const currentData = slides[currentSlide];

  return (
    <div 
      className="w-full h-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#2b2b2b]"
      ref={containerRef}
    >
      {/* Aspect Ratio Container */}
      <div 
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
        className="bg-white shadow-2xl relative overflow-hidden flex flex-col border border-gray-300 slide-deck"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full absolute inset-0"
          >
            <SlideRenderer slide={currentData} />
          </motion.div>
        </AnimatePresence>
        
        {/* Slide Number Bottom Right */}
        <div className="absolute bottom-4 right-8 text-gray-500 font-bold text-lg pointer-events-none">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Speaker Notes Overlay */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 bg-yellow-50 shadow-2xl max-w-4xl w-full p-8 border-l-8 border-yellow-500 z-50 text-gray-900"
          >
            <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold border-b border-gray-300 pb-2">
              <MessageSquareText size={24} />
              <h3 className="text-xl uppercase">Speaker Notes - Slide {currentData.slideNumber}</h3>
            </div>
            <p className="text-2xl leading-relaxed font-serif">{currentData.speakerNotes}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Bar */}
      <div className="fixed bottom-0 w-full h-16 bg-neutral-950 flex items-center justify-between px-6 border-t border-neutral-800 z-50 text-neutral-400 font-sans">
        <div className="flex items-center gap-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={32} />
          </button>
          
          <div className="font-bold text-lg min-w-24 text-center text-white">
            {currentSlide + 1} / {slides.length}
          </div>
          
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-2 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={32} />
          </button>
        </div>
        
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-2 px-6 py-2 rounded font-bold transition-colors ${
              showNotes ? 'bg-yellow-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
            }`}
          >
            <MessageSquareText size={20} />
            Notes (N)
          </button>
          
          <button 
            onClick={toggleFullScreen}
            className="p-2 hover:text-white transition-colors"
          >
            <Maximize size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
