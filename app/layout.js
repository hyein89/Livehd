export const metadata = {
  title: "Live Sports HD",
  description: "Streaming olahraga berkualitas tinggi.",
  openGraph: {
    title: "Live Sports HD",
    description: "Streaming olahraga berkualitas tinggi.",
    images: ["/icons/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Sports HD",
    description: "Streaming olahraga berkualitas tinggi.",
    images: ["/icons/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          fontFamily: "sans-serif",
          background: "#0a0a0a",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {children}
      </body>
    </html>
  );
}
