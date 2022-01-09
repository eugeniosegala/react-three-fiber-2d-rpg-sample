import React from "react";
import { useBox } from "@react-three/cannon";

import { wood } from "../utils/textureManager";
import { useFrame } from "@react-three/fiber";

const Attack = ({ action, camera }) => {
  const [ref, api] = useBox(() => ({
    fixedRotation: true,
    isTrigger: true,
  }));

  useFrame(() => {
    if (action) {
      api.position.set(camera.position.x + 1, 0.5, camera.position.z);
    } else {
      api.position.set(3, -5, 3);
    }
  });

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" transparent={true} map={wood} />
    </mesh>
  );
};

export default Attack;
