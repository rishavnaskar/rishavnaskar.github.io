"use client";

/* eslint-disable react-hooks/immutability --
   The renderer, scene and shadow map that `useThree` hands back are three.js
   objects meant to be configured imperatively, and `useFrame` runs on the
   WebGL loop rather than during a React render. */

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { LoadingOverlay, Pill, StageFrame } from "./StageShell";

/* =====================================================================
   HobbyCanvas — a reusable, mobile-friendly WebGL stage.
     • Lazy-mounts only when scrolled near (saves a context up-front).
     • Pauses the render loop the moment it leaves the viewport / tab.
     • Drag to orbit, gentle auto-rotate when idle, no scroll-jacking
       (wheel/pinch zoom disabled so the page keeps scrolling).
     • A procedural studio env-map gives metals/paint real reflections
       without fetching an HDR (keeps the static export self-contained).
   ===================================================================== */

/** Builds a soft studio reflection environment from a gradient canvas. */
function StudioEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#ffffff");
    g.addColorStop(0.42, "#d6d9ec");
    g.addColorStop(0.5, "#a3a8c8");
    g.addColorStop(0.5, "#6b6f88");
    g.addColorStop(1, "#1c1d29");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 256);
    // a few bright soft-box strips for specular highlights
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillRect(70, 26, 150, 30);
    ctx.fillRect(330, 44, 110, 22);
    ctx.fillStyle = "rgba(180,200,255,0.6)";
    ctx.fillRect(220, 18, 70, 16);
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    const env = pmrem.fromEquirectangular(tex).texture;
    scene.environment = env;
    return () => {
      env.dispose();
      pmrem.dispose();
      tex.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* The model + lights are static (only the camera orbits), so the directional
   shadow map is identical every frame. Render a couple frames once the model
   is on screen, then freeze it — drops a full shadow pass from each frame. */
function FreezeShadows({ enabled }: { enabled: boolean }) {
  const { gl, invalidate } = useThree();
  const frames = useRef(0);
  useFrame(() => {
    if (!enabled) return;
    if (frames.current < 2) {
      gl.shadowMap.needsUpdate = true;
      frames.current += 1;
      invalidate();
    } else if (gl.shadowMap.autoUpdate) {
      gl.shadowMap.autoUpdate = false;
    }
  });
  return null;
}

export default function HobbyCanvas({
  children,
  camera = [4.5, 2.4, 5.5],
  target = [0, 0.7, 0],
  fov = 32,
  shadowScale = 7,
  ready = true,
  failed = false,
}: {
  children: React.ReactNode;
  camera?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
  shadowScale?: number;
  /** When false, a loading shimmer covers the stage (asset still downloading). */
  ready?: boolean;
  /** When true, the asset failed to load — show a static placeholder. */
  failed?: boolean;
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setMounted(true);
        setActive(e.isIntersecting && !document.hidden);
      },
      { threshold: 0.05, rootMargin: "250px" },
    );
    io.observe(el);
    const onVis = () => {
      const r = el.getBoundingClientRect();
      setActive(!document.hidden && r.bottom > 0 && r.top < window.innerHeight);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <StageFrame>
      {mounted && !failed && (
        <Canvas
          shadows
          camera={{ position: camera, fov }}
          dpr={[1, 1.5]}
          frameloop={active ? (reduce ? "demand" : "always") : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <StudioEnv />
          <FreezeShadows enabled={ready} />
          <ambientLight intensity={0.55} />
          <directionalLight
            position={[6, 9, 5]}
            intensity={1.7}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0002}
            shadow-camera-near={1}
            shadow-camera-far={25}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />
          {/* Warm key from the ember side, cool rim opposite — the same
              light/shadow split as the page, so the models sit in the brand
              rather than in the violet/cyan of the palette this was built on. */}
          <pointLight position={[-7, 3, -5]} intensity={34} color="#ffb48a" />
          <pointLight position={[7, 1.5, 6]} intensity={18} color="#d6dcf0" />
          {children}
          {/* baked once the model is on screen (keyed on `ready`) — the scene
              is static, so there's no need to re-render the contact shadow */}
          <ContactShadows
            key={ready ? "ready" : "loading"}
            frames={ready ? 1 : Infinity}
            position={[0, 0, 0]}
            opacity={0.5}
            scale={shadowScale}
            blur={2.6}
            far={6}
            resolution={512}
            color="#1a1512"
          />
          <OrbitControls
            makeDefault
            target={target}
            enablePan={false}
            enableZoom={false}
            autoRotate={!reduce}
            autoRotateSpeed={0.7}
            enableDamping
            dampingFactor={0.08}
            minPolarAngle={0.25}
            maxPolarAngle={Math.PI / 2.05}
          />
        </Canvas>
      )}

      {/* loading shimmer — visible until the asset is parsed & on screen */}
      {!ready && !failed && <LoadingOverlay />}

      {/* failed to load — static placeholder */}
      {failed && (
        <div className="absolute inset-0 z-10 grid place-items-center rounded-3xl bg-paper-warm/50">
          <Pill tone="faint">
            <span className="size-1.5 rounded-full bg-ash" />
            3D model unavailable
          </Pill>
        </div>
      )}

      {/* drag hint — only once the model is interactive */}
      {ready && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2">
          <Pill>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h4l3 8 4-16 3 8h4" />
            </svg>
            Drag to explore
          </Pill>
        </div>
      )}
      </StageFrame>
    </div>
  );
}
