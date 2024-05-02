import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []); // Gunakan array kosong agar efek hanya dijalankan sekali saat komponen dipasang

  const formattedTime = time.toLocaleTimeString();

  return (
    <div>
      <h1>Current Time:</h1>
      <h2>{formattedTime}</h2>
    </div>
  );
}

root.render(<App />);
