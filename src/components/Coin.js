import { useBox } from "@react-three/cannon";

import { coin } from "../utils/textureManager";
import coinSound from "../sounds/coin.wav";

const Coin = ({ position }) => {
  const sound = new Audio(coinSound);
  const [ref, api] = useBox(() => ({
    isTrigger: true,
    fixedRotation: true,
    args: [0.5, 0.5, 0.5],
    position,
    onCollide: handleOnCollide,
  }));

  const handleOnCollide = async () => {
    await sound.play();
    api.position.set(position[0], -5, position[2]);
  };

  return (
    <mesh {...{ position, ref }}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" transparent={true} map={coin} />
    </mesh>
  );
};

export default Coin;
