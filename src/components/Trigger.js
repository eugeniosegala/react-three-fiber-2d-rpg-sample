import { useState } from "react";
import { useBox } from "@react-three/cannon";

import { coin } from "../utils/textures";
import coinSound from "../sounds/coin.wav";

const TriggerInternal = ({ position, setCollisions }) => {
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
    setCollisions(1);
  };

  return (
    <mesh {...{ position, ref }}>
      <boxGeometry />
      <meshStandardMaterial transparent={true} map={coin} />
    </mesh>
  );
};

const Trigger = ({ position }) => {
  const [collisions, setCollisions] = useState(0);

  if (collisions > 0) {
    return null;
  }

  return (
    <TriggerInternal
      position={position}
      collisions={collisions}
      setCollisions={setCollisions}
    />
  );
};

export default Trigger;
