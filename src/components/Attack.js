import React from "react";
import { useBox } from "@react-three/cannon";

import { bomb } from "../utils/textureManager";
import { useFrame } from "@react-three/fiber";

const Attack = ({
  action,
  camera,
  moveRight,
  moveBackward,
  moveForward,
  moveLeft,
}) => {
  const [ref, api] = useBox(() => ({
    fixedRotation: true,
    isTrigger: true,
  }));

  useFrame(() => {
    if (action) {
      if (moveForward) {
        api.position.set(camera.position.x, 0.5, camera.position.z - 1.2);
      } else if (moveBackward) {
        api.position.set(camera.position.x, 0.5, camera.position.z + 1.2);
      } else if (moveRight) {
        api.position.set(camera.position.x + 1.2, 0.5, camera.position.z);
      } else if (moveLeft) {
        api.position.set(camera.position.x - 1.2, 0.5, camera.position.z);
      } else {
        api.position.set(camera.position.x, 0.5, camera.position.z + 1);
      }
    } else {
      api.position.set(3, -5, 3);
    }
  });

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" transparent={true} map={bomb} />
    </mesh>
  );
};

export default Attack;
