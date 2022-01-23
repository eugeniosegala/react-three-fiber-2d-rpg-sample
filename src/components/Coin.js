import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { coin } from "../utils/textureManager";
import coinSound from "../sounds/coin.wav";
import { calcDistance } from "../utils/calcDistance";

const Coin = ({ position }) => {
  const sound = new Audio(coinSound);

  const ref = useRef();
  const [hide, setHide] = useState(false);

  useFrame((world) => {
    if (!hide) {
      const position = ref.current.position;

      // this is supposed to be the first object in the scene: tshe player
      const collision =
        calcDistance(world.scene.children[0].position, position) < 1;

      if (collision) {
        sound.play();
        setHide(true);
      }
    }
  });

  if (hide) {
    return null;
  }

  return (
    <mesh position={position} ref={ref} name="Coin">
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        transparent={true}
        map={coin}
        depthTest={false}
      />
    </mesh>
  );
};

const isSameType = (prevProps, nextProps) => {
  return prevProps.type === nextProps.type;
};

export default React.memo(Coin, isSameType);
