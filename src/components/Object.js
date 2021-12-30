import { useBox } from "@react-three/cannon";

import { wood } from "../utils/textures";

const Object = (props) => {
  const [ref] = useBox(() => ({
    fixedRotation: true,
    mass: 1,
    position: [0, 5, 0],
    ...props,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial transparent={true} map={wood} />
    </mesh>
  );
};

export default Object;
