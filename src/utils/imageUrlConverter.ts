/**
 * Image URL Utility
 * Converts various cloud storage URLs to direct embeddable URLs
 */

/**
 * Convert Google Drive sharing URL to direct image URL
 * Supports formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return url;
  
  // Already a direct URL
  if (url.includes('drive.google.com/uc?') && url.includes('export=view')) {
    return url;
  }

  // Extract file ID from various Google Drive URL formats
  let fileId: string | null = null;
  
  // Format: /file/d/FILE_ID/
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }
  
  // Format: ?id=FILE_ID or &id=FILE_ID
  if (!fileId) {
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      fileId = idMatch[1];
    }
  }
  
  // Format: /uc?id=FILE_ID
  if (!fileId) {
    const ucMatch = url.match(/\/uc\?.*id=([a-zA-Z0-9_-]+)/);
    if (ucMatch) {
      fileId = ucMatch[1];
    }
  }

  if (fileId) {
    // Use the thumbnail URL for better performance and reliability
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  
  return url;
}

/**
 * Convert Dropbox sharing URL to direct image URL
 */
export function convertDropboxUrl(url: string): string {
  if (!url) return url;
  
  // Convert dl=0 to dl=1 for direct download
  if (url.includes('dropbox.com') && url.includes('dl=0')) {
    return url.replace('dl=0', 'dl=1');
  }
  
  // Add raw=1 parameter if not present
  if (url.includes('dropbox.com') && !url.includes('raw=1') && !url.includes('dl=1')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}raw=1`;
  }
  
  return url;
}

/**
 * Convert OneDrive sharing URL to direct image URL
 */
export function convertOneDriveUrl(url: string): string {
  if (!url) return url;
  
  // Convert share link to embed link
  if (url.includes('1drv.ms') || url.includes('onedrive.live.com')) {
    // For OneDrive, we need to modify the URL to get direct access
    if (url.includes('embed')) {
      return url;
    }
    // Replace 'redir?' with 'download?' or append download parameter
    if (url.includes('redir?')) {
      return url.replace('redir?', 'download?');
    }
  }
  
  return url;
}

/**
 * Smart URL converter - detects the service and converts accordingly
 */
export function convertToDirectImageUrl(url: string): string {
  if (!url) return url;
  
  const lowerUrl = url.toLowerCase();
  
  // Google Drive
  if (lowerUrl.includes('drive.google.com') || lowerUrl.includes('docs.google.com')) {
    return convertGoogleDriveUrl(url);
  }
  
  // Dropbox
  if (lowerUrl.includes('dropbox.com')) {
    return convertDropboxUrl(url);
  }
  
  // OneDrive
  if (lowerUrl.includes('1drv.ms') || lowerUrl.includes('onedrive.live.com')) {
    return convertOneDriveUrl(url);
  }
  
  // Return as-is for other URLs
  return url;
}

/**
 * Check if URL is from a cloud storage service that needs conversion
 */
export function needsUrlConversion(url: string): boolean {
  if (!url) return false;
  
  const lowerUrl = url.toLowerCase();
  return (
    lowerUrl.includes('drive.google.com') ||
    lowerUrl.includes('docs.google.com') ||
    lowerUrl.includes('dropbox.com') ||
    lowerUrl.includes('1drv.ms') ||
    lowerUrl.includes('onedrive.live.com')
  );
}

export default {
  convertGoogleDriveUrl,
  convertDropboxUrl,
  convertOneDriveUrl,
  convertToDirectImageUrl,
  needsUrlConversion,
};
