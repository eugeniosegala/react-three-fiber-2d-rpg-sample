import { useBox } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

import { playerRightMovement, wood } from "../utils/textures";

const Player = ({ moveForward, moveBackward, moveLeft, moveRight }) => {
  const [ref, api] = useBox(() => ({
    fixedRotation: true,
    mass: 1,
    position: [0, 0.5, 0],
  }));

  const { camera } = useThree();
  const vector = new Vector3();

  // api.position.subscribe((e) => {
  //   camera?.position.set(e[0], 5, e[2]);
  // });

  useFrame(() => {
    const obj = ref.current.getWorldPosition(vector);
    if (moveForward || moveBackward || moveRight || moveLeft) {
      api.velocity.set(moveRight || moveLeft, 0, moveForward || moveBackward);
    } else {
      api.velocity.set(0, 0, 0);
    }
    camera?.position.set(obj.x, 5, obj.z);
    // api.rotation.set(0, 0, 0);
  });

  // useFrame(({ clock: { elapsedTime } }) => {
  //   console.log(elapsedTime);
  // });

  // console.log(moveForward, moveBackward, moveLeft, moveRight);

  const calculateImage = () => {
    if (
      moveForward === 0 &&
      moveBackward === 0 &&
      moveLeft === 0 &&
      moveRight === 0
    ) {
      return wood;
    }

    if (moveForward || moveBackward || moveRight || moveLeft) {
      return playerRightMovement;
    }
  };

  return (
    <mesh ref={ref} name="Player">
      <boxGeometry />
      <meshStandardMaterial
        attachArray="material"
        transparent={true}
        map={calculateImage()}
      />
    </mesh>
  );
};

export default Player;
