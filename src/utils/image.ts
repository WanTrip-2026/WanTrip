/**
 * Optimizes Cloudinary image URLs by adding auto format and quality parameters.
 * @param url The original Cloudinary image URL
 * @param options resize options (width, height)
 * @returns The optimized URL
 */
export function getOptimizedImageUrl(
  url: string | undefined,
  options?: { w?: number; h?: number; c?: string },
): string {
  if (!url) return ''
  if (!url.includes('cloudinary.com')) return url

  // Inject optimization parameters
  // Pattern: /upload/ + params + /v...
  // If params already exist, append to them. If not, create them.
  const parts = url.split('/upload/')
  if (parts.length !== 2) return url

  let params = 'f_auto,q_auto'

  if (options?.w) params += `,w_${options.w}`
  if (options?.h) params += `,h_${options.h}`
  if (options?.c) params += `,c_${options.c}` // crop mode, e.g., 'fill', 'scale'

  // check if there are existing params in the second part (before the version 'v1...')
  const secondPart = parts[1]
  if (!secondPart) return url

  if (secondPart.startsWith('v')) {
    // No existing params, simple injection
    return `${parts[0]}/upload/${params}/${secondPart}`
  } else {
    // There might be existing params or just no version?
    // Cloudinary usually has /upload/params/v1234/name.jpg or /upload/v1234/name.jpg
    // If it starts with 'v', it's version.
    // If it doesn't start with 'v', it might be existing params or directly the image name (if logic is loose).
    // Let's assume standard structure: /upload/EXISTING_PARAMS/v... or /upload/v...
    // We want to insert ours before the version or append to existing.

    // Regex to find where the version starts or the path continues
    // A simplified approach: split by '/' again
    const subParts = secondPart.split('/')
    const firstSubPart = subParts[0]

    if (firstSubPart && firstSubPart.startsWith('v') && !isNaN(Number(firstSubPart.substring(1)))) {
      // It was a version after all? "v1768..."
      return `${parts[0]}/upload/${params}/${secondPart}`
    }

    if (!firstSubPart) return url

    // Likely existing params at subParts[0]
    const existingParams = firstSubPart
    const rest = subParts.slice(1).join('/')
    // Merge params
    return `${parts[0]}/upload/${existingParams},${params}/${rest}`
  }
}
