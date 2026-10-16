"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import dynamic from "next/dynamic";
import { LoadingOverlay, StageFrame } from "./StageShell";

/**
 * The 3D viewer is the heaviest thing on the site — three.js, the loaders and
 * the React renderer come to most of a megabyte — and it sits two-thirds of
 * the way down the page. Importing it statically put all of that in the
 * initial bundle for every visitor, including the ones on a phone who never
 * scroll this far. So the import is deferred twice: it is a dynamic chunk,
 * and that chunk is only requested once the stage is within a few hundred
 * pixels of the viewport. Until then the frame is a placeholder of the same
 * size, so nothing shifts when the canvas arrives.
 */
const ModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
  loading: () => (
    <StageFrame>
      <LoadingOverlay />
    </StageFrame>
  ),
});

export default function HobbyModel(props: ComponentProps<typeof ModelViewer>) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {near ? (
        <ModelViewer {...props} />
      ) : (
        <StageFrame>
          <LoadingOverlay />
        </StageFrame>
      )}
    </div>
  );
}
