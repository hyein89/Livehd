import LiveClient from "./LiveClient";
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

export default async function LivePage({ params }) {
  const dataPath = path.join(process.cwd(), "data", "matches.json");
  const jsonData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const slugParam = params.slug.toLowerCase();
  const match = jsonData.find((m) => slugify(m.title) === slugParam);

  if (!match) return null;

  // 💡 kirim data ke komponen client
  return <LiveClient match={match} />;
}
