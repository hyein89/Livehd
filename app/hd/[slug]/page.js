"use client";
import { useEffect, useState } from "react";
import matches from "@/data/matches.json"; // pastikan file JSON kamu di /data/matches.json
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { slug } = useParams();
  const router = useRouter();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewers, setViewers] = useState("• 5.2K Watching");

  useEffect(() => {
    const found = matches.find(
      (m) => m.title.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
    );
    setMatch(found || null);
  }, [slug]);

  // Fungsi _KE
  const _KE = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("▶️ Stream dimulai!");
      // atau arahkan ke halaman streaming:
      // router.push("/player/" + slug);
    }, 5000);
  };

  // Random viewers tiap beberapa detik
  useEffect(() => {
    const randomize = () => {
      let base = 4800 + Math.floor(Math.random() * 1000);
      let suffix = base > 999 ? (base / 1000).toFixed(1) + "K" : base;
      setViewers(`• ${suffix} Watching`);
    };
    const id = setInterval(randomize, Math.floor(Math.random() * 3000) + 3000);
    randomize();
    return () => clearInterval(id);
  }, []);

  // Deteksi device: redirect desktop ke Google
  useEffect(() => {
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = "https://www.google.com";
    }
  }, []);

  if (!match) {
    return (
      <div className="notranslate text-center py-10">
        ⚠️ Pertandingan tidak ditemukan
      </div>
    );
  }

  return (
    <div className="notranslate">
      <header onClick={_KE}>
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
          LIVE <span className="viewers">{viewers}</span>
        </div>
        <div className="overlay"></div>
        <div className={`play-btn ${loading ? "loading" : ""}`} onClick={_KE}>
          <span className="material-icons">
            {loading ? "autorenew" : "play_arrow"}
          </span>
        </div>

        <div className="video-controls">
          <div className="quality">480P</div>
          <span className="material-icons control-btn">volume_up</span>
          <span className="material-icons control-btn">fullscreen</span>
        </div>
      </div>

      <a href="#" className="watch-now" onClick={_KE}>
        Stream 720 [HD]
      </a>

      <div className="actions" onClick={_KE}>
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
          <div id="container-3911d811a20e71a5214546d08cc0afaf"></div>
        </div>
      </div>

      <div className="menu-area" onClick={_KE}>
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
          ].map((sport, i) => (
            <div className="menu-item" key={i}>
              <span className="material-icons">sports_soccer</span> {sport}
            </div>
          ))}
        </div>
      </div>

      <footer>© 2025 ClTv Sports. All rights reserved.</footer>
    </div>
  );
}
