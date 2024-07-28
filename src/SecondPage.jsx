import * as THREE from 'three';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import {makeItGrain} from "./grain.js"

// Extend Three.js components for use in JSX
extend({ SphereGeometry: THREE.SphereGeometry });

const AnimatedMaterial = a(MeshDistortMaterial);

export default function SecondPage({ setBg }) {
  const sphere = useRef();
  const light = useRef();
  const [mode, setMode] = useState(false);
  const [down, setDown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { camera, gl } = useThree();

  

  useEffect(() => {
    if (camera) {
      makeItGrain(THREE, camera); // Apply the grain effect
    }
  }, [camera]);

  // Make the bubble float and follow the mouse
  useFrame((state) => {
    light.current.position.x = state.mouse.x * 20;
    light.current.position.y = state.mouse.y * 20;
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, hovered ? state.mouse.x / 2 : 0, 0.2);
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.mouse.y / 2 : 0),
        0.2
      );
    }
  });

  // Springs for color and overall looks
  const [{ wobble, coat, color, ambient, env }] = useSpring(
    {
      wobble: down ? 1.2 : hovered ? 1.05 : 1.05,
      coat: mode && !hovered ? 0.03 : 0.03,
      ambient: mode && !hovered ? 1.5 : 1.5,
      env: mode && !hovered ? 0.4 : 1,
      color: hovered ? '#283635' : mode ? '#283635' : '#283635',
      config: (n) => n === 'wobble' && hovered && { mass: 50, tension: 100, friction: 100}
    },
    [mode, hovered, down]
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3.8]} fov={70}>
        <a.ambientLight intensity={ambient} />
        <a.pointLight ref={light} position-z={-15} intensity={env} color="#F8C069" />
      </PerspectiveCamera>
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}
