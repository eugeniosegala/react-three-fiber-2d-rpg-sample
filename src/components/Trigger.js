import { useState, useEffect } from "react";
import { useBox } from "@react-three/cannon";
import useSound from "use-sound";

import { coin } from "../utils/textures";
import coinSound from "../sounds/coin.wav";

const TriggerInternal = ({ position, collisions, setCollisions }) => {
  const [ref] = useBox(() => ({
    isTrigger: true,
    fixedRotation: true,
    args: [0.5, 0.5, 0.5],
    position,
    onCollide: handleOnCollide,
  }));

  const handleOnCollide = () => {
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
  const [play] = useSound(coinSound);

  useEffect(() => {
    if (collisions === 1) {
      play();
    }
  }, [collisions]);

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
