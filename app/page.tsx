"use client"
import React, { useState } from 'react';
import axios from 'axios';

interface Format {
  quality: string;
  type: string;
  mimeType: string;
  itag: string;
}

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [formats, setFormats] = useState([]);
  const [link, setLink] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<any>(null);

  const fetchVideoInfo = async () => {
    try {
      const response = await axios.post('/api/download', { url: link });
      setVideoInfo(response.data);
      // console.log(response)
      setFormats(response?.data?.formats)
    } catch (error) {
      console.error('Error fetching video info:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <header className="bg-gray-800 p-4 text-white text-center w-full">
        <h1 className="text-2xl md:text-3xl font-bold">Instatube Downloader</h1>
        <p className="text-sm mt-2">Download Instagram and YouTube videos easily by pasting the link</p>
      </header>

      <section className="flex-grow flex items-center justify-center bg-gradient-to-r from-pink-400 to-purple-500 py-10 px-4 md:px-10 w-full">
        <div className="text-center text-white p-6 md:p-10 max-w-xl w-full">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">Download Your Favorite Videos</h2>

          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter YouTube video link"
            className="p-2 rounded w-full mb-4"
          />

          <button
            className="p-2 bg-blue-500 text-white rounded w-full md:w-auto"
            onClick={fetchVideoInfo}
            disabled={!link}
          >
            Get Video Info
          </button>

          {/* Display video info and format options */}
          {videoInfo && (
            <div className="mt-6 text-left">
              <h3 className="text-lg font-semibold">{videoInfo.title}</h3>
              <img src={videoInfo.thumbnail} alt="Video Thumbnail" className="mb-4" />

              <h4 className="font-medium">Select Format:</h4>
              <select
                // onChange={(e) => setSelectedFormat(e.target.value)}
                className="p-2 rounded w-full mb-4"
              >
                <option value="">Choose a format</option>
                {videoInfo.formats.map((format: Format) => (
                  <option key={format.itag} value={format.itag}>
                    {format.quality} - {format.type}
                  </option>
                ))}
              </select>

              <button
                className="p-2 bg-green-500 text-white rounded w-full md:w-auto"
                // onClick={handleDownload}
              >
                Download
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-800 p-4 text-white text-center w-full">
        <p>&copy; 2024 Instatube Downloader. All rights reserved.</p>
      </footer>
    </div>


   

  );
}
