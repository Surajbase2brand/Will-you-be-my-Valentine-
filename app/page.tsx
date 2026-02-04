'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Coordinates {
  top: string;
  left: string;
}

export default function Home() {
  const [image, setImage] = useState(false);
  const [coord, setCoords] = useState<Coordinates | null>(null);
  const [response, setResponse] = useState('No');

  const handleNoBtn = () => {
    // Goal: "No" button kabhi "Yes" ke upar overlap na kare.
    // Desktop (>=768px): "No" ko mostly right side me rakho.
    // Mobile: "No" ko mostly lower area me rakho.
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(min-width: 768px)").matches;

    const top = isDesktop
      ? 5 + Math.random() * 55 // 5% - 60%
      : 55 + Math.random() * 35; // 55% - 90%

    const left = isDesktop
      ? 60 + Math.random() * 30 // 60% - 90%
      : 15 + Math.random() * 70; // 15% - 85%

    setCoords({ top: `${top}%`, left: `${left}%` });

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
            style={coord ? { position: 'absolute', top: coord.top, left: coord.left } : undefined}
            onClick={handleNoBtn}
            onPointerEnter={handleNoPointerEnter}
          >{response}</button>
        </div>
      </section>
    </div >
  );
}
