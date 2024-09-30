export default function imageLoader({ src, width, quality }) {
  if (src.includes('favicon')) {
    return src; // Return favicon URLs as-is
  }
  // For other images, you can return a URL for optimization if needed
  return `${src}?w=${width}&q=${quality || 75}`
}
