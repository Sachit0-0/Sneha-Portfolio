"use client";
import { ReactLenis } from "lenis/react";
import React, { PropsWithChildren, useRef } from "react";

const LenisProvider = ({ children }: PropsWithChildren) => {
  const lenisRef = useRef(null);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
