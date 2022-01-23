import React, { useRef } from "react";

import { coin } from "../utils/textureManager";

const Coin = ({ position }) => {
  const ref = useRef();

  return (
    <mesh position={position} ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" transparent={true} map={coin} />
    </mesh>
  );
};

const isSameType = (prevProps, nextProps) => {
  return prevProps.type === nextProps.type;
};

export default React.memo(Coin, isSameType);
