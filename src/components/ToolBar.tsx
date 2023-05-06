import React from "react";

export interface Character {
  id: string;
  name: string;
  reflexValue: number;
  paPoints: number;
  prPoints: number;
}

interface ToolBarProps {
}

const ToolBar: React.FC<ToolBarProps> = ({}) => {
  
  return (
    <div className="bg-neutral-900 rounded-lg h-10 mb-4 sticky top-0">
      <div className="flex justify-center h-full">
        <div className="w-1/4 flex items-center justify-center rounded-lg hover:bg-gray-400">
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M402 76.94C362.61 37.63 310.78 16 256 16h-.37A208 208 0 0048 224v100.67A79.62 79.62 0 0098.29 399l23.71 9.42a15.92 15.92 0 019.75 11.72l10 50.13A32.09 32.09 0 00173.12 496H184a8 8 0 008-8v-39.55c0-8.61 6.62-16 15.23-16.43A16 16 0 01224 448v40a8 8 0 008 8 8 8 0 008-8v-39.55c0-8.61 6.62-16 15.23-16.43A16 16 0 01272 448v40a8 8 0 008 8 8 8 0 008-8v-39.55c0-8.61 6.62-16 15.23-16.43A16 16 0 01320 448v40a8 8 0 008 8h10.88a32.09 32.09 0 0031.38-25.72l10-50.14a16 16 0 019.74-11.72l23.71-9.42A79.62 79.62 0 00464 324.67v-99c0-56-22-108.81-62-148.73zM171.66 335.88a56 56 0 1152.22-52.22 56 56 0 01-52.22 52.22zM281 397.25a16.37 16.37 0 01-9.3 2.75h-31.4a16.37 16.37 0 01-9.28-2.75 16 16 0 01-6.6-16.9l15.91-47.6C243 326 247.25 321 254 320.13c8.26-1 14 2.87 17.61 12.22l16 48a16 16 0 01-6.61 16.9zm66.68-61.37a56 56 0 1152.22-52.22 56 56 0 01-52.24 52.22z" />
          </svg>
        </div>
        <div className="w-1/4 flex items-center justify-center rounded-lg hover:bg-gray-400">
          <svg viewBox="0 0 20 20" fill="currentColor" height="1em" width="1em">
            <path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 110-20 10 10 0 010 20z" />
          </svg>
        </div>
        <div className="w-1/4 flex items-center justify-center rounded-lg hover:bg-gray-400">
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7z" />
          </svg>
        </div>
        <div className="w-1/4 flex items-center justify-center rounded-lg hover:bg-gray-400">
          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
            <path d="M5 2H4v2h1v1a7.014 7.014 0 003.433 6.02c.355.21.567.547.567.901v.158c0 .354-.212.691-.566.9A7.016 7.016 0 005 19v1H4v2h16v-2h-1v-1a7.016 7.016 0 00-3.434-6.021c-.354-.208-.566-.545-.566-.9v-.158c0-.354.212-.69.566-.9A7.016 7.016 0 0019 5V4h1V2H5zm12 3a5.01 5.01 0 01-2.45 4.299A3.107 3.107 0 0013.166 11h-2.332a3.114 3.114 0 00-1.385-1.702A5.008 5.008 0 017 5V4h10v1z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
