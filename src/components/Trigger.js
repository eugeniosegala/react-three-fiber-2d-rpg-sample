import { useBox } from "@react-three/cannon";

const Trigger = ({ args, onCollide, position }) => {
  const [ref] = useBox(() => ({ isTrigger: true, args, position, onCollide }));
  return (
    <mesh {...{ position, ref }}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

export default Trigger;
