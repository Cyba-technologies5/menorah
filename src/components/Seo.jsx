// src/components/Seo.jsx
export default function Seo({
  title = "Menorah Health LLP",
  description = "Compassionate home health & DODD support across Franklin & Delaware Counties.",
  canonical,
  og = {},
  twitter = {},
  noindex = false,
  keywords,     // <--- NEW
  ldJson,       // pass a JS object (Organization/LocalBusiness/etc.)
}) {
  const fullTitle = title.includes("Menorah Health LLP")
    ? title
    : `${title} | Menorah Health LLP`;

  const ogImage = og.image || "/assets/about/heroImage.png"; // adjust path if needed

  // normalize keywords
  const kwArray = Array.isArray(keywords)
    ? keywords.filter(Boolean)
    : (typeof keywords === "string" ? keywords.split(",").map(s => s.trim()).filter(Boolean) : []);

  const kwString = kwArray.join(", ");

  // merge keywords into JSON-LD (adds both `keywords` and `knowsAbout`)
  let mergedLdJson = ldJson;
  if (ldJson && typeof ldJson === "object") {
    // shallow clone so we don't mutate props
    mergedLdJson = { ...ldJson };
    if (kwArray.length) {
      mergedLdJson.keywords = kwString;
      // If it's a @graph, attach to first node; otherwise attach here
      if (Array.isArray(mergedLdJson["@graph"])) {
        const first = { ...mergedLdJson["@graph"][0] };
        first.knowsAbout = [...new Set([...(first.knowsAbout || []), ...kwArray])];
        mergedLdJson["@graph"] = [first, ...mergedLdJson["@graph"].slice(1)];
      } else {
        mergedLdJson.knowsAbout = [...new Set([...(mergedLdJson.knowsAbout || []), ...kwArray])];
      }
    }
  }

  return (
    <>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Local SEO keywords (meta) */}
      {kwString && <meta name="keywords" content={kwString} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={og.type || "website"} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitter.card || "summary_large_image"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD */}
      {mergedLdJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mergedLdJson) }}
        />
      )}
    </>
  );
}
