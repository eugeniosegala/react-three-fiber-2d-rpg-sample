import React, { useRef } from "react";

import { wood } from "../utils/textureManager";

const Object = ({ texture, position }) => {
  const ref = useRef();

  return (
    <mesh ref={ref} position={position}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        transparent={true}
        map={texture || wood}
      />
    </mesh>
  );
};

const isSameType = (prevProps, nextProps) => {
  return prevProps.type === nextProps.type;
};

export default React.memo(Object, isSameType);
