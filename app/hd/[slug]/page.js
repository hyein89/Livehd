import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

// Fungsi untuk ubah judul jadi slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")        // ganti spasi dengan -
    .replace(/[^\w-]+/g, "")     // hapus karakter aneh
    .replace(/--+/g, "-")        // ganti double dash jadi satu
    .replace(/^-+/, "")          // hapus dash di awal
    .replace(/-+$/, "");         // hapus dash di akhir
}

// Metadata untuk share ke sosial media
export async function generateMetadata({ params }) {
  const dataPath = path.join(process.cwd(), "data", "matches.json");
  const jsonData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const match = jsonData.find((m) => slugify(m.title) === params.slug);

  if (!match) {
    return {
      title: "404 | Tidak Ditemukan",
      description: "Pertandingan tidak ditemukan.",
    };
  }

  const ogImage = match.url_img_a || "/icons/logo.png";

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

  const match = jsonData.find((m) => slugify(m.title) === params.slug);

  if (!match) return notFound();

  return (
    <main style={{ padding: "50px 20px" }}>
      <h1>{match.title}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div>
          <img
            src={match.url_img_a}
            alt={match.title_tim_a}
            width="120"
            height="120"
            style={{ borderRadius: "10px" }}
          />
          <p>{match.title_tim_a}</p>
        </div>
        <div>
          <img
            src={match.url_img_b}
            alt={match.title_tim_b}
            width="120"
            height="120"
            style={{ borderRadius: "10px" }}
          />
          <p>{match.title_tim_b}</p>
        </div>
      </div>
    </main>
  );
}
