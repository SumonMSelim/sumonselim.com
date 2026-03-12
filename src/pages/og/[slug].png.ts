import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export async function getStaticPaths() {
  const articles = await getCollection("articles");
  return articles.map((entry) => ({
    params: { slug: entry.slug },
    props: {
      title: entry.data.title,
      tag: entry.data.tag ?? "",
      date: entry.data.date,
      wordCount: entry.body.split(/\s+/).length,
    },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { title, tag, date, wordCount } = props;
  const readingMins = Math.max(1, Math.ceil(wordCount / 200));
  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fontRegular = readFileSync(
    resolve("./node_modules/@fontsource/inter/files/inter-latin-400-normal.woff")
  );
  const fontBold = readFileSync(
    resolve("./node_modules/@fontsource/inter/files/inter-latin-700-normal.woff")
  );

  const titleSize = title.length > 70 ? "40px" : title.length > 45 ? "50px" : "60px";

  const footerItems: object[] = [
    {
      type: "div",
      props: {
        style: { fontSize: "18px", color: "#a0a0a0", fontWeight: 400 },
        children: "Muhammad Sumon Molla Selim",
      },
    },
    dot(),
    {
      type: "div",
      props: { style: { fontSize: "18px", color: "#666" }, children: formattedDate },
    },
    dot(),
    {
      type: "div",
      props: { style: { fontSize: "18px", color: "#666" }, children: `${readingMins} min read` },
    },
  ];

  const children: object[] = [
    // Left accent bar
    {
      type: "div",
      props: {
        style: {
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "8px",
          height: "630px",
          background: "#00e545",
        },
      },
    },
    // Site domain
    {
      type: "div",
      props: {
        style: {
          fontSize: "16px",
          color: "#00e545",
          letterSpacing: "0.08em",
          fontWeight: 400,
          marginBottom: "20px",
          fontFamily: "Inter",
        },
        children: "www.sumonselim.com",
      },
    },
  ];

  // Tag badge (only if present)
  if (tag) {
    children.push({
      type: "div",
      props: {
        style: { display: "flex", marginBottom: "24px" },
        children: {
          type: "span",
          props: {
            style: {
              fontSize: "15px",
              color: "#00e545",
              background: "rgba(0,229,69,0.1)",
              border: "1px solid rgba(0,229,69,0.25)",
              padding: "4px 14px",
              borderRadius: "100px",
              fontWeight: 400,
            },
            children: tag,
          },
        },
      },
    });
  }

  // Title
  children.push({
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        flex: 1,
        fontSize: titleSize,
        fontWeight: 700,
        color: "#ffffff",
        lineHeight: 1.25,
      },
      children: title,
    },
  });

  // Footer divider + author/meta row
  children.push({
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        paddingTop: "24px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      },
      children: footerItems,
    },
  });

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          background: "#0d0d0d",
          display: "flex",
          flexDirection: "column",
          padding: "56px 70px 50px 80px",
          fontFamily: "Inter",
          position: "relative",
        },
        children,
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
        { name: "Inter", data: fontBold, weight: 700, style: "normal" },
      ],
    }
  );

  const png = new Resvg(svg).render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

function dot() {
  return {
    type: "div",
    props: {
      style: {
        width: "4px",
        height: "4px",
        background: "#444",
        borderRadius: "50%",
      },
    },
  };
}
