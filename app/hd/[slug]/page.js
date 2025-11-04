import fs from "fs";
import path from "path";

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

// Metadata (server-side)
export async function generateMetadata({ params }) {
  const dataPath = path.join(process.cwd(), "data", "matches.json");
  const json = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const slug = params.slug.toLowerCase();
  const match = json.find((m) => slugify(m.title) === slug);

  if (!match) {
    return {
      title: "404 - Pertandingan Tidak Ditemukan",
      description: "Pertandingan tidak ditemukan",
    };
  }

  const og = match.img_thumb || match.url_img_a || "/logo.png";

  return {
    title: `${match.title} | Tigoal Live HD`,
    description: `${match.title_tim_a} vs ${match.title_tim_b}`,
    openGraph: {
      title: match.title,
      description: `${match.title_tim_a} vs ${match.title_tim_b}`,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: match.title,
      description: `${match.title_tim_a} vs ${match.title_tim_b}`,
      images: [og],
    },
  };
}

// Page (server component that renders HTML + scripts)
export default async function Page({ params }) {
  const dataPath = path.join(process.cwd(), "data", "matches.json");
  const json = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const slug = params.slug.toLowerCase();
  const match = json.find((m) => slugify(m.title) === slug);

  if (!match) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h1>⚠️ Pertandingan tidak ditemukan</h1>
        <p>Periksa kembali URL atau kembali ke beranda.</p>
      </div>
    );
  }

  // Inline script content (string) — diletakkan di akhir body
  const inlineClientScript = `
    // simpan original jika ada
    const original_KE = window._KE;

    window._KE = function() {
      try {
        const btn = document.querySelector('.play-btn');
        if (!btn) return;
        if (btn.classList.contains('loading')) return;
        btn.classList.add('loading');
        const icon = btn.querySelector('.material-icons');
        if (icon) icon.textContent = 'autorenew';
        setTimeout(() => {
          btn.classList.remove('loading');
          if (icon) icon.textContent = 'play_arrow';
          if (typeof original_KE === 'function') original_KE();
        }, 5000);
      } catch (e) { console.error(e); }
    };

    function randomViewers() {
      const viewersEl = document.querySelector('.live-badge .viewers');
      if (!viewersEl) return;
      let base = 4800 + Math.floor(Math.random() * 1000);
      let suffix = base > 999 ? (base / 1000).toFixed(1) + 'K' : base;
      viewersEl.textContent = '• ' + suffix + ' Watching';
    }

    setInterval(randomViewers, Math.floor(Math.random() * 3000) + 3000);
    randomViewers();

    // mobile-only redirect (keep as in your template)
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = "https://www.google.com";
    }
  `;

  // Return the template (JSX) — preserves look & links, meta tags done above
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{match.title} | Tigoal Live HD</title>
        <meta name="google" content="notranslate" />
        <link rel="icon" type="image/x-icon" href="/ico.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+Marker+Gothic&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="/style.css" rel="stylesheet" />

        {/* External scripts in head like template (will be output to client) */}
        <script type="text/javascript" src="//signingunwilling.com/63/1d/71/631d718e79ef6f18378d6cc0ddcea5cf.js"></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `var qzyyM_GmH_UnThec={"it":4566373,"key":"a7306"};`,
          }}
        />
        <script type="text/javascript" src="https://d1y0yks1k8t5m5.cloudfront.net/ff3d778.js"></script>

        {/* Open Graph meta (server-side ensured above but double-check for clients that read head) */}
        <meta property="og:title" content={match.title} />
        <meta property="og:description" content={`${match.title_tim_a} vs ${match.title_tim_b}`} />
        <meta property="og:image" content={match.img_thumb || match.url_img_a || "/logo.png"} />
        <meta property="og:url" content={`https://${process.env.VERCEL_URL || "your-domain.vercel.app"}/hd/${params.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </head>

      <body className="notranslate">
        <header onClick={() => window._KE?.()}>
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

        <div className="player" style={{ backgroundImage: `url('${match.img_thumb || ""}')` }}>
          <div className="live-badge">LIVE <span className="viewers">• 5.2K Watching</span></div>
          <div className="overlay"></div>
          <div className="play-btn" onClick={() => window._KE?.()}>
            <span className="material-icons">play_arrow</span>
          </div>

          <div className="video-controls">
            <div className="quality">480P</div>
            <span className="material-icons control-btn">volume_up</span>
            <span className="material-icons control-btn">fullscreen</span>
          </div>
        </div>

        <a href="#" className="watch-now" onClick={() => window._KE?.()}>Stream 720 [HD]</a>

        <div className="actions" onClick={() => window._KE?.()}>
          <div className="btn apk"><span className="material-icons">android</span> APK</div>
          <div className="btn tv"><span className="material-icons">tv</span> TV</div>
          <div className="btn tg"><span className="material-icons">send</span> TG</div>
        </div>

        <div className="ad-area">
          <div className="ad-title">Advertisement</div>
          <div className="ad-banner">
            <script async data-cfasync="false" src="//signingunwilling.com/3911d811a20e71a5214546d08cc0afaf/invoke.js"></script>
            <div id="container-3911d811a20e71a5214546d08cc0afaf"></div>
          </div>
        </div>

        <div className="menu-area" onClick={() => window._KE?.()}>
          <h3>ClTv Sports</h3>
          <div className="menu-grid">
            <div className="menu-item"><span className="material-icons">sports_soccer</span> Football</div>
            <div className="menu-item"><span className="material-icons">sports_basketball</span> Basketball</div>
            <div className="menu-item"><span className="material-icons">sports_tennis</span> Tennis</div>
            <div className="menu-item"><span className="material-icons">sports_motorsports</span> Motorsport</div>
            <div className="menu-item"><span className="material-icons">sports_cricket</span> Cricket</div>
            <div className="menu-item"><span className="material-icons">sports_rugby</span> Rugby</div>
            <div className="menu-item"><span className="material-icons">sports_kabaddi</span> Fight</div>
            <div className="menu-item"><span className="material-icons">sports_volleyball</span> Volleyball</div>
            <div className="menu-item"><span className="material-icons">sports_hockey</span> Hockey</div>
            <div className="menu-item"><span className="material-icons">sports_gymnastics</span> Badminton</div>
            <div className="menu-item"><span className="material-icons">directions_bike</span> Bicycle</div>
            <div className="menu-item"><span className="material-icons">sports_baseball</span> Baseball</div>
          </div>
        </div>

        <footer>© 2025 ClTv Sports. All rights reserved.</footer>

        {/* inline client script (defines window._KE, random viewers, mobile redirect) */}
        <script dangerouslySetInnerHTML={{ __html: inlineClientScript }} />
      </body>
    </html>
  );
}
