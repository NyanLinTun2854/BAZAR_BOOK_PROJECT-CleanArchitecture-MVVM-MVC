import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

/**
 * 💡 CENTRALIZED KEY CONSTANTS
 */
export enum SecureStorageKey {
  AUTH_TOKEN = 'authToken',
  REFRESH_TOKEN = 'refreshToken',
  USER_ID = 'userId',
  // Add other sensitive keys here
}

/**
 * 💾 SECURE STORAGE SERVICE
 * Abstract layer for handling CRUD operations on react-native-secure-key-store.
 */

// ----------------------------------------------------------------------
// C (Create) / U (Update): Set a value
// ----------------------------------------------------------------------
export async function setItem(
  key: SecureStorageKey,
  value: string,
): Promise<boolean> {
  try {
    await RNSecureKeyStore.set(key, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    return true;
  } catch (error) {
    console.error(`SecureStorage: Failed to set item for key ${key}`, error);
    return false;
  }
}

// ----------------------------------------------------------------------
// R (Read): Get a value
// ----------------------------------------------------------------------
export async function getItem(key: SecureStorageKey): Promise<string | null> {
  try {
    // RNSecureKeyStore.get returns a string if found.
    const value = await RNSecureKeyStore.get(key);
    return value;
  } catch (error: any) {
    if (error.code === '404' || error.code === 'E_NOT_FOUND') {
      return null;
    }

    console.error(`SecureStorage: Failed to get item for key ${key}`, error);
    return null;
  }
}

// ----------------------------------------------------------------------
// D (Delete): Remove a key
// ----------------------------------------------------------------------
export async function removeItem(key: SecureStorageKey): Promise<boolean> {
  try {
    await RNSecureKeyStore.remove(key);
    return true;
  } catch (error) {
    console.error(`SecureStorage: Failed to remove item for key ${key}`, error);
    return false;
  }
}
