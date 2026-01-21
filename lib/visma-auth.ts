/**
 * Visma OAuth2 Authentication
 * 
 * Handles authentication with Visma APIs using client credentials flow
 * Caches tokens to minimize API calls and improve performance
 */

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

// In-memory token cache (in production, use Redis)
let tokenCache: TokenCache | null = null;

const VISMA_AUTH_URL = process.env.VISMA_TOKEN_URL || 'https://connect.visma.com/connect/token';
const TOKEN_BUFFER = 60 * 1000; // Refresh 1 minute before expiry

/**
 * Get a valid access token for Visma APIs
 * Uses client credentials OAuth2 flow
 * 
 * Credentials required:
 * - VISMA_CLIENT_ID
 * - VISMA_CLIENT_SECRET
 * - VISMA_TOKEN_URL
 * - VISMA_TENANT_ID
 */
export async function getVismaAccessToken(): Promise<string> {
  // Check if cached token is still valid
  if (tokenCache && tokenCache.expiresAt > Date.now() + TOKEN_BUFFER) {
    return tokenCache.accessToken;
  }

  // Get credentials from environment
  const clientId = process.env.VISMA_CLIENT_ID;
  const clientSecret = process.env.VISMA_CLIENT_SECRET;
  const tokenUrl = process.env.VISMA_TOKEN_URL;
  const tenantId = process.env.VISMA_TENANT_ID;
  const scopes = process.env.VISMA_SCOPES || 'api';

  if (!clientId || !clientSecret || !tokenUrl || !tenantId) {
    throw new Error(
      'Missing Visma OAuth2 credentials. Add VISMA_CLIENT_ID, VISMA_CLIENT_SECRET, VISMA_TOKEN_URL, and VISMA_TENANT_ID to .env.local'
    );
  }

  try {
    console.log('[Visma Auth] Requesting token from:', tokenUrl);
    console.log('[Visma Auth] Client ID:', clientId);
    console.log('[Visma Auth] Tenant ID:', tenantId);
    console.log('[Visma Auth] Scopes:', scopes);
    
    // Request new token using client credentials flow
    // Include tenant_id as a separate parameter
    console.log('[Visma Auth] Final scope:', scopes);
    
    // Create form body with proper URL encoding
    const formBody = new URLSearchParams();
    formBody.append('grant_type', 'client_credentials');
    formBody.append('client_id', clientId);
    formBody.append('client_secret', clientSecret);
    formBody.append('scope', scopes);
    formBody.append('tenant_id', tenantId);
    
    console.log('[Visma Auth] Request body:', formBody.toString());
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    });

    console.log('[Visma Auth] Response status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error('[Visma Auth] Error response:', error);
      throw new Error(`Visma auth failed: ${response.status} - ${error}`);
    }

    const data = await response.json();
    console.log('[Visma Auth] Token obtained successfully');

    // Cache the token
    tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    console.log('[Visma Auth] New token obtained, expires in', data.expires_in, 'seconds');

    return data.access_token;
  } catch (error) {
    console.error('[Visma Auth] Error obtaining access token:', error);
    throw error;
  }
}

/**
 * Get Visma tenant ID from environment
 */
export function getVismaTenantId(): string {
  const tenantId = process.env.VISMA_TENANT_ID;
  if (!tenantId) {
    throw new Error('Missing VISMA_TENANT_ID in environment');
  }
  return tenantId;
}

/**
 * Clear the token cache (useful for testing or emergency resets)
 */
export function clearTokenCache(): void {
  tokenCache = null;
  console.log('[Visma Auth] Token cache cleared');
}

/**
 * Get cached token expiry time (for monitoring)
 */
export function getTokenExpiry(): Date | null {
  if (!tokenCache) return null;
  return new Date(tokenCache.expiresAt);
}
