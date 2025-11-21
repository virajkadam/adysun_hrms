const title = "Adysun Ventures | Candidate Enquiry";
const description = "Submit your enquiry to Adysun Ventures to explore career opportunities, share your profile, and connect with our HR team.";
const url = "https://www.adysunventures.com/enquiry";

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Adysun Ventures enquiry, candidate enquiry, HR enquiry, job enquiry, Adysun careers"
      />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Adysun Ventures" />
      <meta property="og:image" content="https://www.adysunventures.com/adysun-logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.adysunventures.com/adysun-logo.png" />
      <link rel="canonical" href={url} />
    </>
  );
}
