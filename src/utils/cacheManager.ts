/**
 * Cache Management and Version Control
 * 
 * Handles intelligent cache invalidation when new builds are deployed.
 * Clears outdated content without affecting performance by operating
 * during the loading screen phase.
 */

export interface AppVersion {
  version: string;
  buildTime: number;
  hash: string;
}

const VERSION_KEY = 'app_version';
const LAST_CHECK_KEY = 'last_version_check';
const CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes

/**
 * Get current app version from build metadata
 */
export function getCurrentVersion(): AppVersion {
  return {
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    buildTime: parseInt(import.meta.env.VITE_BUILD_TIME || Date.now().toString(), 10),
    hash: import.meta.env.VITE_BUILD_HASH || 'dev',
  };
}

/**
 * Get stored version from localStorage
 */
export function getStoredVersion(): AppVersion | null {
  try {
    const stored = localStorage.getItem(VERSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to parse stored version:', error);
    return null;
  }
}

/**
 * Store current version in localStorage
 */
export function storeVersion(version: AppVersion): void {
  try {
    localStorage.setItem(VERSION_KEY, JSON.stringify(version));
    localStorage.setItem(LAST_CHECK_KEY, Date.now().toString());
  } catch (error) {
    console.error('Failed to store version:', error);
  }
}

/**
 * Check if version check is needed based on interval
 */
export function shouldCheckVersion(): boolean {
  try {
    const lastCheck = localStorage.getItem(LAST_CHECK_KEY);
    if (!lastCheck) return true;
    
    const timeSinceCheck = Date.now() - parseInt(lastCheck, 10);
    return timeSinceCheck > CHECK_INTERVAL;
  } catch {
    return true;
  }
}

/**
 * Compare two versions to detect if update is needed
 */
export function isVersionOutdated(current: AppVersion, stored: AppVersion): boolean {
  // Compare build hash first (most reliable)
  if (current.hash !== stored.hash && current.hash !== 'dev') {
    return true;
  }
  
  // Compare build time (fallback)
  if (current.buildTime > stored.buildTime) {
    return true;
  }
  
  // Compare version string
  if (current.version !== stored.version) {
    return true;
  }
  
  return false;
}

/**
 * Clear all browser caches
 */
export async function clearAllCaches(): Promise<void> {
  const clearOperations: Promise<void>[] = [];
  
  // 1. Clear Cache API (Service Worker caches)
  if ('caches' in window) {
    clearOperations.push(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => {
        console.log('✓ Cache API cleared');
      })
    );
  }
  
  // 2. Clear localStorage (except version info and user preferences)
  try {
    const preserveKeys = ['theme', 'i18nextLng']; // Preserve user preferences
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !preserveKeys.includes(key)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log('✓ localStorage cleared (preserved user preferences)');
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
  
  // 3. Clear sessionStorage
  try {
    sessionStorage.clear();
    console.log('✓ sessionStorage cleared');
  } catch (error) {
    console.error('Failed to clear sessionStorage:', error);
  }
  
  // 4. Unregister service workers (if needed for major updates)
  if ('serviceWorker' in navigator) {
    clearOperations.push(
      navigator.serviceWorker.getRegistrations().then(registrations => {
        return Promise.all(
          registrations.map(registration => {
            // Only unregister if we're doing a major update
            // For minor updates, let the service worker update naturally
            return registration.update();
          })
        );
      }).then(() => {
        console.log('✓ Service workers updated');
      })
    );
  }
  
  // Wait for all clear operations
  await Promise.all(clearOperations);
}

/**
 * Perform version check and cache clearing if needed
 * Returns true if cache was cleared
 */
export async function checkAndClearCache(): Promise<boolean> {
  try {
    const currentVersion = getCurrentVersion();
    const storedVersion = getStoredVersion();
    
    // First time visitor or no stored version
    if (!storedVersion) {
      storeVersion(currentVersion);
      console.log('First visit - version stored:', currentVersion);
      return false;
    }
    
    // Check if update is needed
    if (isVersionOutdated(currentVersion, storedVersion)) {
      console.log('New version detected:', {
        old: storedVersion,
        new: currentVersion,
      });
      
      // Clear all caches
      await clearAllCaches();
      
      // Store new version
      storeVersion(currentVersion);
      
      console.log('✓ Cache cleared successfully for new version');
      return true;
    }
    
    // No update needed
    return false;
  } catch (error) {
    console.error('Failed to check/clear cache:', error);
    return false;
  }
}

/**
 * Force reload the page (used after cache clearing)
 */
export function forceReload(): void {
  // Hard reload to bypass cache
  window.location.reload();
}

/**
 * Check if a new version is available from server
 * (Optional: for checking without page reload)
 */
export async function checkServerVersion(): Promise<AppVersion | null> {
  try {
    // Fetch version.json from server with cache-busting
    const response = await fetch(`/version.json?t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to check server version:', error);
    return null;
  }
}

/**
 * Initialize version check on app start
 * Call this during loading screen
 */
export async function initVersionCheck(): Promise<{ updated: boolean; needsReload: boolean }> {
  // Only check if interval has passed
  if (!shouldCheckVersion()) {
    return { updated: false, needsReload: false };
  }
  
  const cacheCleared = await checkAndClearCache();
  
  return {
    updated: cacheCleared,
    needsReload: cacheCleared, // Reload if cache was cleared
  };
}
