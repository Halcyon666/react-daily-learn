import React, { useEffect, useState } from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}
export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imgSrc: "http://i.imgflip.com/1bij.jpg",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setMeme((prev) => ({ ...prev, [name]: value }));
  };
  const [memes, setMemes] = useState<Meme[]>();

  useEffect(() => {
    async function fetchMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setMemes(data.data.memes);
    }
    fetchMemes();
  }, []);

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            value={meme.bottomText}
            onChange={handleChange}
            name="bottomText"
          />
        </label>
        <button>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imgSrc} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
