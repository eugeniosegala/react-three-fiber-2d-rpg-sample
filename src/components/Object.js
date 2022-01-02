import React from "react";
import { useBox } from "@react-three/cannon";

import { wood } from "../utils/textureManager";

const Object = ({ position, type, texture, onCollide }) => {
  const [ref] = useBox(() => ({
    fixedRotation: true,
    mass: 1,
    position,
    type: type || "Dynamic",
    onCollide,
  }));

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        transparent={true}
        map={texture || wood}
      />
    </mesh>
  );
};

export default React.memo(Object);
