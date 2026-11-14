'use client';

const WISHLIST_KEY = 'atb_customer_wishlist';

/**
 * Retrieve wishlisted product IDs from localStorage
 */
export function getWishlistIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Check if a product ID is currently wishlisted
 */
export function isProductWishlisted(productId: string): boolean {
  const ids = getWishlistIds();
  return ids.includes(productId);
}

/**
 * Toggle a product ID in the wishlist. Returns new wishlisted state (true = added, false = removed).
 */
export function toggleWishlistItem(productId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const ids = getWishlistIds();
    let updated: string[];
    let added = false;

    if (ids.includes(productId)) {
      updated = ids.filter((id) => id !== productId);
      added = false;
    } else {
      updated = [...ids, productId];
      added = true;
    }

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('atb-wishlist-change', {
        detail: { count: updated.length, ids: updated }
      })
    );
    return added;
  } catch (err) {
    console.error('Failed to update wishlist:', err);
    return false;
  }
}

/**
 * Clear the entire wishlist
 */
export function clearWishlist(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(WISHLIST_KEY);
    window.dispatchEvent(
      new CustomEvent('atb-wishlist-change', {
        detail: { count: 0, ids: [] }
      })
    );
  } catch (err) {
    console.error('Failed to clear wishlist:', err);
  }
}
