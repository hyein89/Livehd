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

  // Pilih gambar untuk share (prioritaskan img_thumb)
  const ogImage = match.img_thumb || match.url_img_a || "/icons/logo.png";

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
    <main style={{ padding: "50px 20px" }}>
      <h1>{match.title}</h1>

      {/* Thumbnail pertandingan */}
      {match.img_thumb && (
        <div style={{ margin: "30px 0" }}>
          <img
            src={match.img_thumb}
            alt={match.title}
            width="300"
            style={{ borderRadius: "12px" }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
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
