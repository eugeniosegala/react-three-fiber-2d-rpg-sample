import React from "react";
import { useBox } from "@react-three/cannon";

import { coin } from "../utils/textureManager";
import coinSound from "../sounds/coin.wav";

const Coin = ({ position, mapData, setCurrentMap }) => {
  const sound = new Audio(coinSound);
  const [ref] = useBox(() => ({
    isTrigger: true,
    fixedRotation: true,
    args: [0.5, 0.5, 0.5],
    position,
    onCollide: handleOnCollide,
  }));

  const handleOnCollide = async () => {
    await sound.play();
    let newMapData = [...mapData];
    newMapData[position[2]][position[0]] = "·";
    setCurrentMap(newMapData);
  };

  // const texture = useMemo(() => new THREE.TextureLoader().load(five), [])

  return (
    <mesh {...{ position, ref }}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" transparent={true} map={coin} />
    </mesh>
  );
};

const isSameType = (prevProps, nextProps) => {
  return prevProps.type === nextProps.type;
};

export default React.memo(Coin, isSameType);
