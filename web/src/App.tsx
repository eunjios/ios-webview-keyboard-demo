import { useCallback, useEffect, useState } from 'react';
import './App.css';

const getItems = (length: number) => {
  return Array.from({ length }, (_, i) => i);
};

function App() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [debugInfo, setDebugInfo] = useState({
    visualHeight: 0,
    visualWidth: 0,
    visualOffsetTop: 0,
    visualOffsetLeft: 0,
    windowHeight: 0,
    windowWidth: 0,
    documentHeight: 0,
    scrollY: 0,
  });

  useEffect(() => {
    const updateDebugInfo = () => {
      setDebugInfo({
        visualHeight: window.visualViewport?.height || 0,
        visualWidth: window.visualViewport?.width || 0,
        visualOffsetTop: window.visualViewport?.offsetTop || 0,
        visualOffsetLeft: window.visualViewport?.offsetLeft || 0,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        documentHeight: document.documentElement.scrollHeight,
        scrollY: window.scrollY,
      });
    };

    updateDebugInfo();

    window.visualViewport?.addEventListener('resize', updateDebugInfo);
    window.visualViewport?.addEventListener('scroll', updateDebugInfo);
    window.addEventListener('resize', updateDebugInfo);
    window.addEventListener('scroll', updateDebugInfo);

    return () => {
      window.visualViewport?.removeEventListener('resize', updateDebugInfo);
      window.visualViewport?.removeEventListener('scroll', updateDebugInfo);
      window.removeEventListener('resize', updateDebugInfo);
      window.removeEventListener('scroll', updateDebugInfo);
    };
  }, []);

  const handleResize = useCallback(() => {
    const height = window.visualViewport?.height || window.innerHeight;
    setViewportHeight(height);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    handleResize();

    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('scroll', () => window.scrollTo(0, 0));

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden container" style={{ height: `${viewportHeight}px` }}>
      <div className="flex-shrink-0 bg-red-100 p-2 py-10">
        <h2>고정된 공간</h2>
      </div>

      <div className="flex-1 bg-gray-100 p-2 overflow-auto">
        <h2>스크롤 가능 공간</h2>
        <ul>
          {getItems(20).map((item, i) => (
            <li key={i} className="p-2 flex justify-between">
              <span>{item}</span>
              <input
                className="border"
                onFocus={() => console.log('Input focused:', i)}
                onBlur={() => console.log('Input blurred:', i)}
              />
            </li>
          ))}
        </ul>
        {/* 디버깅 */}
        <div className="flex-shrink-0 bg-yellow-100 p-2 text-xs font-mono border-2 border-yellow-400">
          <h3 className="font-bold mb-1">Debug Info:</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div>Visual Height: {debugInfo.visualHeight}px</div>
            <div>Window Height: {debugInfo.windowHeight}px</div>
            <div>Visual Width: {debugInfo.visualWidth}px</div>
            <div>Window Width: {debugInfo.windowWidth}px</div>
            <div>Visual OffsetTop: {debugInfo.visualOffsetTop}px</div>
            <div>Visual OffsetLeft: {debugInfo.visualOffsetLeft}px</div>
            <div>Doc Height: {debugInfo.documentHeight}px</div>
            <div>ScrollY: {debugInfo.scrollY}px</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
