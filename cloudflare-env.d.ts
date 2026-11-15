declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    LAUNCHER_ORIGIN?: string;
  }
}
