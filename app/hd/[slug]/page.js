import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

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

  const ogImage = match.img_thumb || match.url_img_a || "/ico.jpg";

  return {
    title: match.title,
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

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{match.title} | Tigoal Live HD</title>
        <meta name="google" content="notranslate" />
        <link rel="icon" type="image/x-icon" href="/ico.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+Marker+Gothic&family=Poppins:wght@100;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link href="/style.css" rel="stylesheet" />
      </head>
      <body className="notranslate">
        <header>
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
          style={{ backgroundImage: `url(${match.img_thumb || ""})` }}
        >
          <div className="live-badge">
            LIVE <span className="viewers">• 5.2K Watching</span>
          </div>
          <div className="overlay"></div>
          <div className="play-btn" onClick={() => window._KE && window._KE()}>
            <span className="material-icons">play_arrow</span>
          </div>

          <div className="video-controls">
            <div className="quality">480P</div>
            <span className="material-icons control-btn">volume_up</span>
            <span className="material-icons control-btn">fullscreen</span>
          </div>
        </div>

        <a href="#" className="watch-now" onClick={() => window._KE && window._KE()}>
          Stream 720 [HD]
        </a>

        <div className="actions">
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

        <footer>© 2025 ClTv Sports. All rights reserved.</footer>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                window.location.href = "https://www.google.com";
              }

              function randomViewers() {
                const viewersEl = document.querySelector('.live-badge .viewers');
                if(!viewersEl) return;
                let base = 4800 + Math.floor(Math.random() * 1000);
                let suffix = base > 999 ? (base / 1000).toFixed(1) + 'K' : base;
                viewersEl.textContent = '• ' + suffix + ' Watching';
              }
              setInterval(randomViewers, Math.floor(Math.random()*3000)+3000);
              randomViewers();
            `,
          }}
        ></script>
      </body>
    </html>
  );
}
