"use client";

import { useEffect } from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Script from "next/script";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function generateMetadata({ params }) {
  const dataPath = path.join(process.cwd(), "data", "matches.json");
  const jsonData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const slugParam = params.slug.toLowerCase();
  const match = jsonData.find((m) => slugify(m.title) === slugParam);

  if (!match) {
    return {
      title: "404 | Tidak Ditemukan",
      description: "Pertandingan tidak ditemukan.",
    };
  }

  const ogImage = match.img_thumb || match.url_img_a || "/logo.png";

  return {
    title: match.title + " | Tigoal Live HD",
    description: `${match.title_tim_a} vs ${match.title_tim_b}`,
    openGraph: {
      title: match.title,
      description: `${match.title_tim_a} vs ${match.title_tim_b}`,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: match.title,
      description: `${match.title_tim_a} vs ${match.title_tim_b}`,
      images: [ogImage],
    },
  };
}

export default function LivePage({ params }) {
  const dataPath = path.join(process.cwd(), "data", "matches.json");
  const jsonData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const slugParam = params.slug.toLowerCase();
  const match = jsonData.find((m) => slugify(m.title) === slugParam);

  if (!match) return notFound();

  useEffect(() => {
    // definisikan ulang window._KE agar bisa diakses global
    const original_KE = window._KE;
    window._KE = function () {
      const btn = document.querySelector(".play-btn");
      if (!btn) return;
      if (btn.classList.contains("loading")) return;

      btn.classList.add("loading");
      btn.querySelector(".material-icons").textContent = "autorenew";

      setTimeout(() => {
        btn.classList.remove("loading");
        btn.querySelector(".material-icons").textContent = "play_arrow";
        if (typeof original_KE === "function") original_KE();
      }, 5000);
    };

    // random viewers function
    function randomViewers() {
      const viewersEl = document.querySelector(".live-badge .viewers");
      if (!viewersEl) return;
      let base = 4800 + Math.floor(Math.random() * 1000);
      let suffix = base > 999 ? (base / 1000).toFixed(1) + "K" : base;
      viewersEl.textContent = "• " + suffix + " Watching";
    }

    setInterval(randomViewers, Math.floor(Math.random() * 3000) + 3000);
    randomViewers();

    // redirect kalau bukan HP
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = "https://www.google.com";
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google" content="notranslate" />
        <title>{match.title} | Tigoal Live HD</title>
        <link rel="icon" type="image/x-icon" href="/ico.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+Marker+Gothic&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link href="/style.css" rel="stylesheet" />

        {/* script iklan */}
        <Script
          src="//signingunwilling.com/63/1d/71/631d718e79ef6f18378d6cc0ddcea5cf.js"
          strategy="afterInteractive"
        />
        <Script id="ad-config" strategy="afterInteractive">
          {`var qzyyM_GmH_UnThec = {"it":4566373,"key":"a7306"};`}
        </Script>
        <Script
          src="https://d1y0yks1k8t5m5.cloudfront.net/ff3d778.js"
          strategy="afterInteractive"
        />
      </head>

      <body className="notranslate">
        <header onClick={() => window._KE()}>
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
            <span>ClTv Sports</span>
          </div>
          <div className="menu-icons">
            <span className="material-icons">menu</span>
            <span className="material-icons">settings</span>
          </div>
        </header>

        <section className="match">
          <h2>Live Match: {match.title}</h2>
          <div className="teams">
            <div className="team">
              <img src={match.url_img_a} alt={match.title_tim_a} />
              <span>{match.title_tim_a}</span>
            </div>
            <div className="vs">VS</div>
            <div className="team">
              <img src={match.url_img_b} alt={match.title_tim_b} />
              <span>{match.title_tim_b}</span>
            </div>
          </div>
        </section>

        <div
          className="player"
          style={{
            backgroundImage: `url('${match.img_thumb || ""}')`,
          }}
        >
          <div className="live-badge">
            LIVE <span className="viewers">• 5.2K Watching</span>
          </div>
          <div className="overlay"></div>
          <div className="play-btn" onClick={() => window._KE()}>
            <span className="material-icons">play_arrow</span>
          </div>

          <div className="video-controls">
            <div className="quality">480P</div>
            <span className="material-icons control-btn">volume_up</span>
            <span className="material-icons control-btn">fullscreen</span>
          </div>
        </div>

        <a href="#" className="watch-now" onClick={() => window._KE()}>
          Stream 720 [HD]
        </a>

        <div className="actions" onClick={() => window._KE()}>
          <div className="btn apk">
            <span className="material-icons">android</span> APK
          </div>
          <div className="btn tv">
            <span className="material-icons">tv</span> TV
          </div>
          <div className="btn tg">
            <span className="material-icons">send</span> TG
          </div>
        </div>

        <div className="ad-area">
          <div className="ad-title">Advertisement</div>
          <div className="ad-banner">
            <Script
              async
              data-cfasync="false"
              src="//signingunwilling.com/3911d811a20e71a5214546d08cc0afaf/invoke.js"
              strategy="afterInteractive"
            />
            <div id="container-3911d811a20e71a5214546d08cc0afaf"></div>
          </div>
        </div>

        <div className="menu-area" onClick={() => window._KE()}>
          <h3>ClTv Sports</h3>
          <div className="menu-grid">
            {[
              "Football",
              "Basketball",
              "Tennis",
              "Motorsport",
              "Cricket",
              "Rugby",
              "Fight",
              "Volleyball",
              "Hockey",
              "Badminton",
              "Bicycle",
              "Baseball",
            ].map((item, i) => (
              <div key={i} className="menu-item">
                <span className="material-icons">sports_soccer</span> {item}
              </div>
            ))}
          </div>
        </div>

        <footer>© 2025 ClTv Sports. All rights reserved.</footer>
      </body>
    </html>
  );
}
