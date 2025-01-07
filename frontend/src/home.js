import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function Home() {
  const [hex, sethex] = useState('#181818');

  const handleClick = () => {
    sethex(uuidv4().slice(0, 6));
  };

  return (
    <div>
      <h1>thi5 is the home page</h1>
      <div style={{ backgroundColor: hex }}></div>
      <button>Click to change color</button>
    </div>
  );
}
