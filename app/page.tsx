'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Coordinates {
  x: string;
  y: string;
}

export default function Home() {
  const [image, setImage] = useState(false);
  const [coord, setCoords] = useState<Coordinates | null>(null);
  const [response, setResponse] = useState('No');

  const handleNoBtn = () => {
    const x = Math.random() * 60;
    const y = Math.random() * 60;

    setCoords({ x: `${x}%`, y: `${y}%` });

    const phrases = [
      "Wrong button ❌",
      "Are you sure 🤔?",
      "But what if 🫣?",
      "You're breaking my heart 💔",
      "Pwetty please 🥺👉👈",
      "Can't catch up? 😂"
    ]

    const randomIndex = Math.floor(Math.random() * phrases.length);
    setResponse(phrases[randomIndex]);
  }

  const handleNoPointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Touch devices pe hover-like events se "No" button random move hota rahta hai
    // aur "Yes" click block ho sakta hai. Isliye move sirf mouse hover pe.
    if (e.pointerType !== "mouse") return;
    handleNoBtn();
  };

  const handleYesPointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Touch devices pe hover-like events se button flicker/vibrate ho sakta hai,
    // isliye image swap sirf mouse hover pe karte hain.
    if (e.pointerType !== "mouse") return;
    setImage(true);
  };

  const handleYesPointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    setImage(false);
  };

  return (
    <div className="container">
      <section>
        <div>
          <p>♡ Will you be my Valentine? ♡</p>
        </div>
        <div className="img-container">
          {image ? (
            <Image src="/heppi.gif" alt="cat spinning with sparkles" width={270} height={200} className="cat" />

          ) : (
            <Image src="/please.gif" alt="two animals asking each other to be their valentine gif" width={340} height={200} priority />
          )}
        </div>
        <div className="button-section">
          <Link href='/success'>
            <button
              className="yes-button button-base button-green"
              onPointerEnter={handleYesPointerEnter}
              onPointerLeave={handleYesPointerLeave}
            >
              Yes
            </button>
          </Link>
          <button
            className='no-button button-base button-red'
            style={coord ? { position: 'absolute', top: coord.x, right: coord.y } : undefined}
            onClick={handleNoBtn}
            onPointerEnter={handleNoPointerEnter}
          >{response}</button>
        </div>
      </section>
    </div >
  );
}
