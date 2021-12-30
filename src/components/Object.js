import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

import { wood } from "../utils/textures";

const Object = (props) => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));

  useFrame(() => {
    api.rotation.set(0, 0, 0);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial
        transparent={true}
        map={wood}
      />
    </mesh>
  );
};

export default Object;
