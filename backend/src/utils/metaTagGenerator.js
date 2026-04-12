/**
 * Generate HTML with Open Graph meta tags for social media sharing
 * This is served by social media crawlers to get preview information
 */
export const generateMetaTagsHTML = (place, frontendUrl) => {
  // Fallback to environment variable or default
  const baseUrl =
    frontendUrl || process.env.ORIGIN_1 || "https://parikrama.example.com";

  const placeUrl = `${baseUrl}/current/place/${place._id}`;
  const placeImage = place?.images?.[0]?.url || `${baseUrl}/assets/Logo1.png`;
  const placeDescription =
    place?.description?.substring(0, 160) || "Discover amazing places to visit";
  const placeName = place?.name || "Parikrama Place";
  const placeLocation = `${place?.city?.name}, ${place?.state?.name}`;
  const category = place?.category || "Travel";

  // Escape HTML special characters in content
  const escapeHtml = (text) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  const safePlaceName = escapeHtml(placeName);
  const safePlaceDescription = escapeHtml(placeDescription);
  const safeLocation = escapeHtml(placeLocation);
  const safeCategory = escapeHtml(category);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safePlaceName} - Parikrama</title>
    
    <!-- Open Graph Meta Tags for Facebook, WhatsApp, LinkedIn -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${safePlaceName}" />
    <meta property="og:description" content="${safePlaceDescription}" />
    <meta property="og:image" content="${placeImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${placeUrl}" />
    <meta property="og:site_name" content="Parikrama" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safePlaceName}" />
    <meta name="twitter:description" content="${safePlaceDescription}" />
    <meta name="twitter:image" content="${placeImage}" />
    
    <!-- Additional Meta Tags -->
    <meta name="description" content="${safePlaceDescription}" />
    <meta name="keywords" content="${safePlaceName}, ${safeLocation}, ${safeCategory}, travel, tourism, Parikrama" />
    <meta name="theme-color" content="#FFC20E" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${placeUrl}" />
    
    <!-- Redirect to React App -->
    <script>
        // After meta tags are read by crawlers, redirect to the actual app
        const userAgent = navigator.userAgent.toLowerCase();
        const isCrawler = /bot|crawler|spider|whatsapp|facebook|twitter|linkedin|slack|telegram|viber|skype|discord|pinterest|reddit/i.test(userAgent);
        
        if (!isCrawler) {
            // Not a crawler, redirect to React app
            window.location.href = "${placeUrl}";
        }
    </script>
</head>
<body>
    <p>Loading ${safePlaceName}...</p>
</body>
</html>
  `;
};
