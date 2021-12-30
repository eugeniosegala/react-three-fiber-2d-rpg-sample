import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

const Object = (props) => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));

  useFrame(() => {
    api.rotation.set(0, 0, 0);
  });

  return (
    <mesh ref={ref}>
      <boxBufferGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Object;
