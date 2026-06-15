"use client";

import { Component, Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import HobbyCanvas from "./HobbyCanvas";

/* Catches a failed GLB fetch/parse (e.g. CORS, 404) so it degrades to the
   placeholder instead of taking down the whole page. */
class ModelBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* =====================================================================
   ModelViewer — downloads a GLB at runtime (from Firebase Storage),
   normalises it (centre · ground · scale to a fixed footprint), and
   renders it in the shared HobbyCanvas. A shimmer covers the stage
   until the model is parsed and on screen.
   ===================================================================== */

function GLBModel({
  url,
  targetLength,
  rotationY,
  onReady,
}: {
  url: string;
  targetLength: number;
  rotationY: number;
  onReady: () => void;
}) {
  const { scene } = useGLTF(url);

  const model = useMemo(() => {
    const root = scene.clone(true);

    // scale so the longest horizontal axis ≈ targetLength
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const longest = Math.max(size.x, size.z) || 1;
    root.scale.setScalar(targetLength / longest);

    // re-measure → centre on X/Z, drop onto the ground (y = 0)
    const box2 = new THREE.Box3().setFromObject(root);
    const c = box2.getCenter(new THREE.Vector3());
    root.position.x -= c.x;
    root.position.z -= c.z;
    root.position.y -= box2.min.y;

    // shadows on every mesh
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.castShadow = true;
      m.receiveShadow = true;
    });

    return root;
  }, [scene, targetLength]);

  useEffect(() => {
    onReady();
  }, [onReady, model]);

  return <primitive object={model} rotation={[0, rotationY, 0]} />;
}

export default function ModelViewer({
  url,
  camera,
  target,
  fov,
  shadowScale,
  targetLength,
  rotationY = 0,
}: {
  url: string;
  camera: [number, number, number];
  target: [number, number, number];
  fov: number;
  shadowScale: number;
  targetLength: number;
  rotationY?: number;
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => setFailed(true), []);
  const valid = /^https?:\/\//.test(url);

  return (
    <HobbyCanvas camera={camera} target={target} fov={fov} shadowScale={shadowScale} ready={valid && ready} failed={failed}>
      {valid && (
        <ModelBoundary onError={handleError}>
          <Suspense fallback={null}>
            <GLBModel url={url} targetLength={targetLength} rotationY={rotationY} onReady={handleReady} />
          </Suspense>
        </ModelBoundary>
      )}
    </HobbyCanvas>
  );
}
