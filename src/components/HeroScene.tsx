"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

/* =====================================================================
   HeroScene — a single WebGL context for the hero:
     • an ambient particle nebula behind everything
     • a premium 3D smartphone running an animated "AI agent automation"
       UI (rendered to a CanvasTexture), with orbiting tool chips and a
       violet backlight glow
   The whole rig tilts toward the mouse. The render loop pauses when the
   hero scrolls off-screen or the tab is hidden, so it costs nothing later.
   ===================================================================== */

type Pointer = { x: number; y: number };

/* ─────────────────────────── helpers ─────────────────────────── */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function radialGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(124,92,255,0.9)");
  g.addColorStop(0.4, "rgba(124,92,255,0.35)");
  g.addColorStop(1, "rgba(124,92,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function iconTexture(emoji: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.font = "76px system-ui, 'Apple Color Emoji'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 64, 72);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ─────────────────────────── particles ───────────────────────── */
function Particles({ count, dark }: { count: number; dark: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cA = new THREE.Color("#7c5cff");
    const cB = new THREE.Color("#22d3ee");
    const cC = new THREE.Color("#ff5cab");
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.5 - 3;
      const t = Math.random();
      const col = t < 0.5 ? cA.clone().lerp(cB, t * 2) : cB.clone().lerp(cC, (t - 0.5) * 2);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02 + pointer.x * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.045}
        sizeAttenuation
        transparent
        opacity={dark ? 0.8 : 0.55}
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

/* ───────────────────── animated phone screen ─────────────────── */
const SCREEN_W = 512;
const SCREEN_H = 1108;
const STREAM_LINES = [
  "Scanning your inbox for action items…",
  "Found 3 tasks. Drafting replies and",
  "scheduling follow-ups automatically.",
];
const STEPS = [
  { label: "Search the web", icon: "🔍" },
  { label: "Run Python · analyze", icon: "🐍" },
  { label: "Generate report", icon: "📄" },
  { label: "Send summary email", icon: "✉️" },
];

function drawScreen(ctx: CanvasRenderingContext2D, t: number, dark: boolean) {
  const W = SCREEN_W;
  const H = SCREEN_H;
  const c = dark
    ? { bg0: "#0a0912", bg1: "#15121f", text: "#f4f2ff", muted: "#8e89a8", card: "#1a1730", line: "#272340", accent: "#9d86ff", accent2: "#34d3ee" }
    : { bg0: "#ffffff", bg1: "#f1eefb", text: "#15101f", muted: "#6b6680", card: "#f4f2fb", line: "#e6e2f1", accent: "#6b3fff", accent2: "#0a9bc0" };

  ctx.clearRect(0, 0, W, H);
  // rounded screen clip
  roundRect(ctx, 0, 0, W, H, 56);
  ctx.save();
  ctx.clip();

  // bg
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, c.bg0);
  bg.addColorStop(1, c.bg1);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ambient accent blob
  const blob = ctx.createRadialGradient(W * 0.8, 150, 0, W * 0.8, 150, 360);
  blob.addColorStop(0, dark ? "rgba(124,92,255,0.28)" : "rgba(124,92,255,0.14)");
  blob.addColorStop(1, "rgba(124,92,255,0)");
  ctx.fillStyle = blob;
  ctx.fillRect(0, 0, W, H);

  // notch
  ctx.fillStyle = dark ? "#000" : "#0a0912";
  roundRect(ctx, W / 2 - 70, 26, 140, 34, 17);
  ctx.fill();

  // status bar
  ctx.fillStyle = c.text;
  ctx.font = "600 26px system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText("9:41", 38, 44);
  ctx.textAlign = "right";
  for (let i = 0; i < 4; i++) {
    ctx.globalAlpha = 0.5 + i * 0.16;
    ctx.fillRect(W - 150 + i * 14, 50 - i * 4 - 6, 9, 8 + i * 4);
  }
  ctx.globalAlpha = 1;
  roundRect(ctx, W - 78, 32, 40, 22, 6);
  ctx.fill();

  // header: avatar orb
  const ay = 130;
  const pulse = 0.5 + 0.5 * Math.sin(t * 3);
  const orb = ctx.createRadialGradient(72, ay, 4, 72, ay, 34);
  orb.addColorStop(0, "#c9b8ff");
  orb.addColorStop(0.5, c.accent);
  orb.addColorStop(1, c.accent2);
  ctx.fillStyle = orb;
  ctx.beginPath();
  ctx.arc(72, ay, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = `rgba(157,134,255,${0.5 * pulse})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(72, ay, 30 + pulse * 12, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = c.text;
  ctx.font = "700 32px system-ui, sans-serif";
  ctx.fillText("Stella", 120, ay - 12);
  ctx.fillStyle = "#6ee787";
  ctx.beginPath();
  ctx.arc(122, ay + 20, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = c.muted;
  ctx.font = "500 23px system-ui, sans-serif";
  ctx.fillText("AI Agent · automating", 138, ay + 20);

  // divider
  ctx.strokeStyle = c.line;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(36, 188);
  ctx.lineTo(W - 36, 188);
  ctx.stroke();

  // user bubble (right)
  ctx.font = "500 25px system-ui, sans-serif";
  const ub = "Automate my morning routine";
  const uw = ctx.measureText(ub).width + 44;
  const ubx = W - 36 - uw;
  const grad = ctx.createLinearGradient(ubx, 0, ubx + uw, 0);
  grad.addColorStop(0, "#7c5cff");
  grad.addColorStop(1, "#9d86ff");
  ctx.fillStyle = grad;
  roundRect(ctx, ubx, 224, uw, 60, 24);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillText(ub, ubx + 22, 256);

  // agent streaming bubble (left)
  ctx.fillStyle = c.card;
  roundRect(ctx, 36, 308, W - 150, 150, 24);
  ctx.fill();
  const totalChars = STREAM_LINES.join(" ").length;
  const cycle = (t % 9) / 9;
  const shown = Math.floor(Math.min(cycle * 1.5, 1) * totalChars);
  let acc = 0;
  ctx.fillStyle = c.text;
  ctx.font = "500 25px system-ui, sans-serif";
  let caretXY: [number, number] | null = null;
  for (let i = 0; i < STREAM_LINES.length; i++) {
    const line = STREAM_LINES[i];
    const visible = Math.max(0, Math.min(line.length, shown - acc));
    const partial = line.slice(0, visible);
    const ly = 350 + i * 36;
    ctx.fillText(partial, 60, ly);
    if (visible < line.length && shown - acc >= 0 && shown - acc <= line.length) {
      caretXY = [60 + ctx.measureText(partial).width + 3, ly];
    }
    acc += line.length + 1;
  }
  // blinking caret
  if (caretXY && Math.floor(t * 1.6) % 2 === 0) {
    ctx.fillStyle = c.accent;
    ctx.fillRect(caretXY[0], caretXY[1] - 13, 3, 26);
  }

  // automation steps card
  const cardY = 500;
  ctx.fillStyle = c.card;
  roundRect(ctx, 36, cardY, W - 72, 286, 28);
  ctx.fill();
  ctx.fillStyle = c.accent;
  ctx.font = "700 24px system-ui, sans-serif";
  ctx.fillText("⚡  Automation running", 60, cardY + 40);
  ctx.fillStyle = c.muted;
  ctx.font = "600 20px system-ui, sans-serif";
  ctx.textAlign = "right";
  const pct = Math.floor((((t % 9) / 9) * 100) % 100);
  ctx.fillText(`${pct}%`, W - 60, cardY + 40);
  ctx.textAlign = "left";

  const active = Math.floor((t % 8) / 2) % STEPS.length;
  STEPS.forEach((s, i) => {
    const sy = cardY + 86 + i * 48;
    const done = i < active;
    const isActive = i === active;
    // status chip
    ctx.beginPath();
    ctx.arc(74, sy, 13, 0, Math.PI * 2);
    if (done) {
      ctx.fillStyle = c.accent2;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(68, sy);
      ctx.lineTo(72, sy + 5);
      ctx.lineTo(80, sy - 5);
      ctx.stroke();
    } else if (isActive) {
      ctx.strokeStyle = c.accent;
      ctx.lineWidth = 3;
      const a = t * 6;
      ctx.beginPath();
      ctx.arc(74, sy, 12, a, a + Math.PI * 1.4);
      ctx.stroke();
    } else {
      ctx.strokeStyle = c.line;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.fillStyle = isActive ? c.text : done ? c.muted : c.muted;
    ctx.font = `${isActive ? 700 : 500} 23px system-ui, sans-serif`;
    ctx.fillText(`${s.icon}  ${s.label}`, 104, sy);
  });

  // input bar
  const iy = H - 96;
  ctx.fillStyle = c.card;
  roundRect(ctx, 36, iy, W - 72, 64, 32);
  ctx.fill();
  ctx.fillStyle = c.muted;
  ctx.font = "500 24px system-ui, sans-serif";
  ctx.fillText("Ask Stella anything…", 62, iy + 32);
  const sendG = ctx.createLinearGradient(W - 92, 0, W - 52, 0);
  sendG.addColorStop(0, "#7c5cff");
  sendG.addColorStop(1, "#22d3ee");
  ctx.fillStyle = sendG;
  ctx.beginPath();
  ctx.arc(W - 70, iy + 32, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(W - 80, iy + 24);
  ctx.lineTo(W - 60, iy + 32);
  ctx.lineTo(W - 80, iy + 40);
  ctx.lineTo(W - 75, iy + 32);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function Phone({ dark }: { dark: boolean }) {
  // phone body — beveled rounded rectangle
  const bodyGeo = useMemo(() => {
    const W = 2.45, H = 5.0, R = 0.4, D = 0.22;
    const s = new THREE.Shape();
    const x = -W / 2, y = -H / 2;
    s.moveTo(x + R, y);
    s.lineTo(x + W - R, y);
    s.quadraticCurveTo(x + W, y, x + W, y + R);
    s.lineTo(x + W, y + H - R);
    s.quadraticCurveTo(x + W, y + H, x + W - R, y + H);
    s.lineTo(x + R, y + H);
    s.quadraticCurveTo(x, y + H, x, y + H - R);
    s.lineTo(x, y + R);
    s.quadraticCurveTo(x, y, x + R, y);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: D,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 4,
      curveSegments: 24,
    });
    geo.center();
    return geo;
  }, []);

  const screen = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return { canvas, ctx, texture };
  }, []);

  const glow = useMemo(() => radialGlowTexture(), []);
  const chipTextures = useMemo(() => [iconTexture("⚙️"), iconTexture("🔍"), iconTexture("⚡"), iconTexture("✨")], []);
  const chipsRef = useRef<THREE.Group>(null!);
  const acc = useRef(0);

  useFrame(({ clock, camera }, delta) => {
    const t = clock.getElapsedTime();
    // throttle the screen redraw to ~30fps
    acc.current += delta;
    if (acc.current > 1 / 30) {
      acc.current = 0;
      drawScreen(screen.ctx, t, dark);
      screen.texture.needsUpdate = true;
    }
    // orbit + billboard the tool chips
    if (chipsRef.current) {
      chipsRef.current.rotation.y = t * 0.4;
      chipsRef.current.children.forEach((chip) => {
        chip.quaternion.copy(camera.quaternion);
      });
    }
  });

  return (
    <group>
      {/* backlight halo */}
      <sprite position={[0, 0, -0.6]} scale={[7, 9, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} opacity={dark ? 0.85 : 0.4} blending={THREE.AdditiveBlending} />
      </sprite>

      {/* body */}
      <mesh geometry={bodyGeo} castShadow>
        <meshStandardMaterial color={dark ? "#111019" : "#e9e7f2"} metalness={0.85} roughness={0.28} />
      </mesh>

      {/* screen */}
      <mesh position={[0, 0, 0.2]}>
        <planeGeometry args={[2.12, 4.62]} />
        <meshBasicMaterial map={screen.texture} toneMapped={false} transparent />
      </mesh>

      {/* side buttons */}
      <mesh position={[-1.27, 0.7, 0]}>
        <boxGeometry args={[0.06, 0.5, 0.12]} />
        <meshStandardMaterial color={dark ? "#2a2740" : "#cfcbe0"} metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[1.27, 1.0, 0]}>
        <boxGeometry args={[0.06, 0.3, 0.12]} />
        <meshStandardMaterial color={dark ? "#2a2740" : "#cfcbe0"} metalness={0.8} roughness={0.4} />
      </mesh>

      {/* orbiting automation tool chips */}
      <group ref={chipsRef}>
        {chipTextures.map((tex, i) => {
          const a = (i / chipTextures.length) * Math.PI * 2;
          const rad = 2.45;
          return (
            <group key={i} position={[Math.cos(a) * rad, Math.sin(a * 1.3) * 0.9 - 0.3, Math.sin(a) * rad]}>
              <mesh>
                <planeGeometry args={[0.62, 0.62]} />
                <meshBasicMaterial color={dark ? "#16131f" : "#ffffff"} transparent opacity={0.92} />
              </mesh>
              <mesh position={[0, 0, 0.01]}>
                <planeGeometry args={[0.42, 0.42]} />
                <meshBasicMaterial map={tex} transparent toneMapped={false} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* ───────────── rig: mouse-tilt + idle float ──────────────────── */
function Rig({ pointer, children }: { pointer: React.RefObject<Pointer>; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    const p = pointer.current ?? { x: 0, y: 0 };
    const targetY = p.x * 0.5 - 0.35 + Math.sin(t * 0.5) * 0.06;
    const targetX = -p.y * 0.4 + Math.sin(t * 0.4) * 0.04;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06;
    group.current.position.y = Math.sin(t * 0.8) * 0.12;
  });
  return <group ref={group}>{children}</group>;
}

/* ───────────── places the phone toward the right side ────────── */
function PhoneAnchor({ pointer, dark }: { pointer: React.RefObject<Pointer>; dark: boolean }) {
  const { viewport } = useThree();
  const x = Math.min(viewport.width * 0.23, 4.2);
  const scale = Math.min(Math.max(viewport.width / 16, 0.62), 0.92);
  return (
    <group position={[x, 0.1, 0]} scale={scale}>
      <Rig pointer={pointer}>
        <Phone dark={dark} />
      </Rig>
    </group>
  );
}

/* ───────────────────────── scene root ────────────────────────── */
export default function HeroScene() {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [active, setActive] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [particleCount, setParticleCount] = useState(220);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const update = () => {
      setShowPhone(window.innerWidth >= 1024);
      setParticleCount(window.innerWidth < 768 ? 130 : 220);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    const onVis = () => setActive(!document.hidden && el.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (reduce) return null;

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 11], fov: 38 }}
        dpr={[1, 1.6]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={dark ? 0.6 : 1.1} />
        <directionalLight position={[5, 6, 8]} intensity={dark ? 1.4 : 1.8} />
        <pointLight position={[-6, -2, 4]} intensity={dark ? 40 : 20} color="#7c5cff" />
        <pointLight position={[6, 4, 6]} intensity={dark ? 22 : 12} color="#22d3ee" />
        <Particles count={particleCount} dark={dark} />
        {showPhone && <PhoneAnchor pointer={pointer} dark={dark} />}
        <fog attach="fog" args={[dark ? "#060509" : "#f6f5fb", 12, 26]} />
      </Canvas>
    </div>
  );
}
