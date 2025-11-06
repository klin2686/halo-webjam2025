import React from "react";

const RestaurantInput = () => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file)
    }
  }

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('menu_image', file)

    try {
      const response = await fetch(
        'https://wj-api-dev-ff3daf2f73bd.herokuapp.com/api/process-menu',
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json();
      console.log('Success:', data);

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed!');
    }
  }

  return (
    <div className="h-full w-full bg-white/50 rounded-3xl shadow-xl backdrop-blur-sm border border-white/50 flex flex-col items-center justify-center gap-[1rem] p-[1rem]">
      <div className="grid grid-cols-[2fr_1fr] gap-[1rem] items-start w-full h-full">
        <div className="h-full w-full rounded-xl shadow-xl backdrop-blur-sm outline outline-1 outline-offset-[-0.0625rem] outline-white/50 p-[1.5rem]"></div>
        <div className="grid grid-rows-2 gap-[1rem] items-start w-full h-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="file-input"
          />
          <button 
            onClick={() => document.getElementById('file-input')?.click()}
            className="cursor-pointer justify-between w-full h-full border backdrop-blur-sm border-white/50 rounded-2xl flex items-center justify-center gap-[0.75rem] shadow-xl"
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
          </button>
          <button className="justify-between w-full h-full backdrop-blur-sm border border-white/50 rounded-2xl flex items-center justify-center gap-[0.75rem] shadow-xl">
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInput;
