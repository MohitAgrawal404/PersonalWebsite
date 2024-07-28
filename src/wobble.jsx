//https://codesandbox.io/s/wobbling-sphere-5oufp?file=/src/Scene.js&resolutionWidth=320&resolutionHeight=675 
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

export default function Scene(props) {
  const sphere = useRef();
  const light = useRef();
  const [mode, setMode] = useState(false);
  const [down, setDown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { camera, gl } = useThree();

  // Change cursor on hovered state
  useEffect(() => {
    document.body.style.cursor = hovered
      ? `url('data:image/svg+xml;base64,${btoa(
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#E8B059"/></svg>'
        )}'), auto`
      : `url('data:image/svg+xml;base64,${btoa(
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#E8B059"/></svg>'
        )}'), auto`;
  }, [hovered]);

  useEffect(() => {
    if (camera) {
      makeItGrain(THREE, camera); // Apply the grain effect
    }
  }, [camera]);

  // Make the bubble float and follow the mouse
  useFrame((state) => {
    light.current.position.x = state.pointer.x * 20;
    light.current.position.y = state.pointer.y * 20;
    if (sphere.current) {
      if (props.width < 460){
        sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, hovered ? state.pointer.x / 2 : 0, 0.2) + (0.4 * (props.pos/Math.abs(props.pos)));
      } else {
        sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, hovered ? state.pointer.x / 2 : 0, 0.2) + props.pos;
      }
      
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.pointer.y / 2 : 0),
        0.2
      );
    }
  });

  // Springs for color and overall looks
  const [{ wobble, coat, color, ambient, env }] = useSpring(
    {
      wobble: down ? 1.2 : hovered ? 1.05 : 1.05,
      coat: mode && !hovered ? 0.009 : 0.009,
      ambient: mode && !hovered ? 1.5 : 1.5,
      env: mode && !hovered ? 0.4 : 1,
      color: props.sphere,
      config: (n) => n === 'wobble' && hovered && { mass: 50, tension: 100, friction: 100}
    },
    [mode, hovered, down]
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3.8]} fov={props.fov}>
        <a.ambientLight intensity={ambient} />
        <a.pointLight ref={light} position-z={-15} intensity={env} color="#F8C069" />
      </PerspectiveCamera>
      <Suspense fallback={null}>
        <a.mesh
          ref={sphere}
          scale={wobble}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={() => setDown(true)}
          onPointerUp={() => {
            setDown(false);
            setMode(!mode);
            props.setBg({ background: !mode ? '#283635' : '#283635', fill: !mode ? '#283635' : '#283635' });
          }}>
          <sphereGeometry args={[1, 64, 64]} /> {/* Use sphereGeometry instead */}
          <AnimatedMaterial color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0} metalness={0.1} />
        </a.mesh>
        <Environment preset="city" />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.6, 0]}
          opacity={mode ? 0.8 : 0.4}
          width={15}
          height={15}
          blur={5.5}
          far={1.6}
        />
      </Suspense>
    </>
  );
}
