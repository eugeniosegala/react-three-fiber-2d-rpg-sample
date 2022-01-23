import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { bomb } from "../utils/textureManager";

const Attack = ({
  action,
  camera,
  moveRight,
  moveBackward,
  moveForward,
  moveLeft,
}) => {
  const ref = useRef();

  useFrame(() => {
    if (action) {
      if (moveForward) {
        ref.current.position.set(
          camera.position.x,
          0.5,
          camera.position.z - 1.2
        );
      } else if (moveBackward) {
        ref.current.position.set(
          camera.position.x,
          0.5,
          camera.position.z + 1.2
        );
      } else if (moveRight) {
        ref.current.position.set(
          camera.position.x + 1.2,
          0.5,
          camera.position.z
        );
      } else if (moveLeft) {
        ref.current.position.set(
          camera.position.x - 1.2,
          0.5,
          camera.position.z
        );
      } else {
        ref.current.position.set(camera.position.x, 0.5, camera.position.z + 1);
      }
    } else {
      ref.current.position.set(3, -5, 3);
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
