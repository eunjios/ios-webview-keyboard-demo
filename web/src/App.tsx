import './App.css';

const getItems = (length: number) => {
  return Array.from({ length }, (_, i) => i);
};

function App() {
  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden container">
      <div className="flex-shrink-0 bg-red-100 p-2 py-10">
        <h2>고정된 공간</h2>
      </div>

      <div className="flex-1 bg-gray-100 p-2 overflow-auto">
        <h2>스크롤 가능 공간</h2>
        <ul>
          {getItems(20).map((item, i) => (
            <li key={i} className="p-2 flex justify-between">
              <span>{item}</span>
              <input className="border" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
