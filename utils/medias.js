export function getStrapiMedia(url) {
  // Check if URL is a local path
  if (url.startsWith('/')) {
    // Prepend Strapi address
    return `http://jakestation:1337${url}`
  }
  // Otherwise return full URL
  return url
}
