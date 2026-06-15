/**
 * Remote 3D assets — hosted on Firebase Storage and downloaded + cached by
 * the browser at runtime (never bundled into the static export, so the page
 * stays light). The GLB only starts downloading when its section scrolls
 * into view; a shimmer is shown until it's ready.
 *
 * Paste the Firebase Storage download URLs below. They look like:
 *   https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<path>?alt=media&token=<token>
 *
 * Tip: set a long `Cache-Control` (e.g. `public, max-age=31536000, immutable`)
 * on the objects in Firebase so repeat visits load instantly from disk cache.
 */
export const MODEL_URLS = {
  car: "https://firebasestorage.googleapis.com/v0/b/pareez-billing.appspot.com/o/honda_fit.opt.glb?alt=media&token=b05e7722-de13-464f-bfbb-bc7da145cea6",
  drums: "https://firebasestorage.googleapis.com/v0/b/pareez-billing.appspot.com/o/drum_set.opt.glb?alt=media&token=c29e9791-9aac-4d89-b6f8-59db052dac38",
};

/** Per-model render tuning (camera, scale, orientation). */
export const MODEL_CONFIG = {
  car: {
    camera: [4.8, 2.3, 5.6] as [number, number, number],
    target: [0, 0.7, 0] as [number, number, number],
    fov: 32,
    shadowScale: 7.5,
    targetLength: 3.9,
    rotationY: 0,
  },
  drums: {
    camera: [3.9, 2.4, 4.7] as [number, number, number],
    target: [0, 0.95, 0] as [number, number, number],
    fov: 34,
    shadowScale: 6,
    targetLength: 2.8,
    rotationY: 0,
  },
};
