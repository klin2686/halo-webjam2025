import React, { useState } from "react";
import { motion } from "framer-motion";
import { menuAPI, storage, type MenuItem } from "../utils/api";
import LoadingSpinner from "./LoadingSpinner";
import ManualInputPopup from "./ManualInputPopup";
import MiniHistory from "./MiniHistory";
import { buttonGlowVariants } from "../utils/animations";

interface RestaurantInputProps {
  onMenuProcessed: (items: MenuItem[]) => void;
  onSeeAllClick?: () => void;
}

const RestaurantInput = ({ onMenuProcessed, onSeeAllClick }: RestaurantInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file)
    }
  }
  
  const accessToken = storage.getAccessToken();

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      if (!accessToken) {
        throw new Error('Access token is required');
      }
      const data = await menuAPI.processMenuImage(accessToken, file);
      console.log('Success:', data);
      onMenuProcessed(data);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }

  const handleHistoryItemClick = (items: MenuItem[]) => {
    onMenuProcessed(items);
  };

  const handleManualInputProcessed = (items: MenuItem[]) => {
    onMenuProcessed(items);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {showManualInput && (
        <ManualInputPopup
          onClose={() => setShowManualInput(false)}
          onMenuProcessed={handleManualInputProcessed}
          onSubmitStart={() => setIsLoading(true)}
          onSubmitEnd={() => setIsLoading(false)}
        />
      )}
      <div className="h-full w-full bg-white/50 rounded-3xl shadow-xl backdrop-blur-sm border border-white/50 flex flex-col items-center justify-center gap-[1rem] p-[1rem]">
        <div className="grid grid-cols-[2fr_1fr] gap-[1rem] items-start w-full h-full">
          <div className="h-full w-full rounded-xl shadow-xl backdrop-blur-sm outline outline-1 outline-offset-[-0.0625rem] outline-white/50 p-[1.5rem]">
            <MiniHistory
              key={refreshKey}
              onHistoryItemClick={handleHistoryItemClick}
              onSeeAllClick={onSeeAllClick}
            />
          </div>
          <div className="grid grid-rows-2 gap-[1rem] items-start w-full h-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-input"
            />
            <motion.button
              onClick={() => document.getElementById('file-input')?.click()}
              className="cursor-pointer justify-between w-full h-full border backdrop-blur-sm border-white/50 rounded-2xl flex items-center justify-center gap-[0.75rem] shadow-xl"
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonGlowVariants}
            >
              <span className="text-black text-xl font-sf-pro w-32">Upload Menu</span>
              <svg
                width="32"
                height="32"
                viewBox="-1 -1 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="#56BECC80" fillOpacity="1" />
                <path
                  //M16 10V22M10 16H22 is the plus icon just fyi
                  d="M16 10V22M10 16H22"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => setShowManualInput(true)}
              className="cursor-pointer justify-between w-full h-full backdrop-blur-sm border border-white/50 rounded-2xl flex items-center justify-center gap-[0.75rem] shadow-xl"
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonGlowVariants}
            >
              <span className="text-black text-xl font-sf-pro w-32">Manual Input</span>
              <svg
                width="32"
                height="32"
                viewBox="-1 -1 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="#56BECC80" fillOpacity="1" />
                <path
                  d="M16 10V22M10 16H22"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantInput;
