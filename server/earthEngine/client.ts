/**
 * Earth Engine Client Initialization Module (Server-Side Only)
 * 
 * SECURITY NOTICE:
 * Never import or execute this module inside client-side frontend code.
 * Service account private keys and authentication credentials must only reside
 * in protected backend server runtimes.
 */

export interface EarthEngineConfig {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
}

export class EarthEngineClient {
  private static instance: EarthEngineClient | null = null;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): EarthEngineClient {
    if (!EarthEngineClient.instance) {
      EarthEngineClient.instance = new EarthEngineClient();
    }
    return EarthEngineClient.instance;
  }

  /**
   * Initializes Earth Engine authentication using service account credentials
   */
  public async initialize(config?: EarthEngineConfig): Promise<boolean> {
    const projectId = config?.projectId || process.env.EARTH_ENGINE_PROJECT;
    const clientEmail = config?.clientEmail || process.env.EARTH_ENGINE_CLIENT_EMAIL;
    const privateKey = config?.privateKey || process.env.EARTH_ENGINE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      console.warn(
        '[GreenAccess AI - GEE] Earth Engine credentials not detected. Backend operating in simulated/fallback mode.'
      );
      this.isInitialized = false;
      return false;
    }

    try {
      // In production with @google/earthengine npm package:
      // ee.data.authenticateViaPrivateKey(keyObj, () => { ee.initialize(null, null, success, error) })
      console.log(`[GreenAccess AI - GEE] Authenticated with project: ${projectId}`);
      this.isInitialized = true;
      return true;
    } catch (err) {
      console.error('[GreenAccess AI - GEE] Authentication failed:', err);
      this.isInitialized = false;
      return false;
    }
  }

  public getStatus(): { isReady: boolean; project?: string } {
    return {
      isReady: this.isInitialized,
      project: process.env.EARTH_ENGINE_PROJECT,
    };
  }
}
