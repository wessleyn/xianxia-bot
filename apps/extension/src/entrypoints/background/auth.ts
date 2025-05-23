import { browser } from 'wxt/browser';
import { useAuthStore } from '../popup/stores/useAuthStore';

// Listen for changes to the Supabase auth cookie
browser.cookies.onChanged.addListener(({ cookie, removed }) => {
  // The cookie we saw in the screenshot is named like: sb-zqmoyqgwtaqduwdpqhh-auth-token
  if (cookie.domain.includes('wessleyn.me') &&
    cookie.name.startsWith('sb-') &&
    cookie.name.includes('-auth-token')) {

    console.log(`Auth cookie ${cookie.name} was ${removed ? 'removed' : 'added/updated'}`);

    if (!removed) {
      // Cookie was added or updated - sync the session
      syncAuthState();
    } else {
      // Cookie was removed - user logged out
      useAuthStore.getState().logout();
    }
  }
});

// Function to sync auth state from cookies
async function syncAuthState() {
  try {
    // This function gets the session from Supabase which will read the cookies
    // if they're set and use them for authentication
    const success = await useAuthStore.getState().syncCookieSession();
    console.log('Auth sync result:', success ? 'successful' : 'failed');
  } catch (error) {
    console.error('Error syncing auth state from cookies:', error);
  }
}

// Initial sync when background script loads
syncAuthState();
