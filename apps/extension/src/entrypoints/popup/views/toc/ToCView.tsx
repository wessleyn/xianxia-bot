import React, { useState } from 'react';

interface Chapter {
  id: number;
  title: string;
  isRead: boolean;
}

interface Volume {
  id: number;
  title: string;
  chapters: Chapter[];
  isExpanded: boolean;
}

const ToCView: React.FC = () => {
  const [volumes, setVolumes] = useState<Volume[]>([
    {
      id: 1,
      title: "Volume 1: The Beginning",
      isExpanded: true,
      chapters: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Chapter ${i + 1}: The Initial Steps`,
        isRead: i < 10
      }))
    },
    {
      id: 2,
      title: "Volume 2: The Journey",
      isExpanded: false,
      chapters: Array.from({ length: 20 }, (_, i) => ({
        id: i + 16,
        title: `Chapter ${i + 16}: New Adventures`,
        isRead: i < 5
      }))
    },
    {
      id: 3,
      title: "Volume 3: The Battle",
      isExpanded: false,
      chapters: Array.from({ length: 18 }, (_, i) => ({
        id: i + 36,
        title: `Chapter ${i + 36}: Facing Enemies`,
        isRead: false
      }))
    },
  ]);

  const toggleVolume = (volumeId: number) => {
    setVolumes(volumes.map(volume =>
      volume.id === volumeId
        ? { ...volume, isExpanded: !volume.isExpanded }
        : volume
    ));
  };

  const markAsRead = (volumeId: number, chapterId: number) => {
    setVolumes(volumes.map(volume =>
      volume.id === volumeId
        ? {
          ...volume,
          chapters: volume.chapters.map(chapter =>
            chapter.id === chapterId
              ? { ...chapter, isRead: !chapter.isRead }
              : chapter
          )
        }
        : volume
    ));
  };

  const markAllAsRead = () => {
    setVolumes(volumes.map(volume => ({
      ...volume,
      chapters: volume.chapters.map(chapter => ({
        ...chapter,
        isRead: true
      }))
    })));
  };

  const jumpToFirstUnread = () => {
    // Find first unread chapter and expand its volume
    for (const volume of volumes) {
      const firstUnread = volume.chapters.find(chapter => !chapter.isRead);
      if (firstUnread) {
        setVolumes(volumes.map(v =>
          v.id === volume.id
            ? { ...v, isExpanded: true }
            : v
        ));
        // In a real app, we would scroll to this chapter
        return;
      }
    }
  };

  const totalChapters = volumes.reduce((total, volume) => total + volume.chapters.length, 0);
  const readChapters = volumes.reduce(
    (total, volume) => total + volume.chapters.filter(chapter => chapter.isRead).length,
    0
  );
  const progress = (readChapters / totalChapters) * 100;

  return (
    <div className="h-[450px] bg-gray-50 text-gray-900 flex flex-col">
      <header className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-md">
        <div className="flex items-center">
          <button className="p-2 hover:bg-white/20 rounded-full" title="Back to library">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 12l14 0"></path>
              <path d="M5 12l6 6"></path>
              <path d="M5 12l6 -6"></path>
            </svg>
          </button>
          <h1 className="ml-2 text-lg font-semibold">Against the Gods</h1>
        </div>
        <div>
          <button className="text-white p-2 rounded-full hover:bg-white/20" title="More options">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dots-vertical" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            </svg>
          </button>
        </div>
      </header>

      <div className="bg-white p-4 flex justify-between items-center shadow-sm">
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{readChapters}/{totalChapters} chapters</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex p-3 gap-2 border-b">
        <button
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-1.5 text-sm font-medium"
          onClick={jumpToFirstUnread}
        >
          Jump to First Unread
        </button>
        <button
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-indigo-800 rounded-md py-1.5 text-sm font-medium"
          onClick={markAllAsRead}
        >
          Mark All as Read
        </button>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar p-2">
        {volumes.map(volume => (
          <div key={volume.id} className="mb-3">
            <button
              className="w-full flex items-center justify-between p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={() => toggleVolume(volume.id)}
            >
              <span className="font-medium text-indigo-800">{volume.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-indigo-600 transition-transform ${volume.isExpanded ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {volume.isExpanded && (
              <div className="pl-2 mt-1 space-y-1">
                {volume.chapters.map(chapter => (
                  <div
                    key={chapter.id}
                    className={`flex items-center p-2 rounded-md ${chapter.isRead ? 'bg-gray-50 text-gray-500' : 'bg-white hover:bg-gray-50'}`}
                  >
                    <button
                      className={`p-1 rounded mr-2 ${chapter.isRead ? 'bg-green-100' : 'bg-gray-100'}`}
                      onClick={() => markAsRead(volume.id, chapter.id)}
                    >
                      {chapter.isRead ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={`text-sm ${chapter.isRead ? 'text-gray-500' : 'text-indigo-800'}`}>
                        {chapter.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToCView;
