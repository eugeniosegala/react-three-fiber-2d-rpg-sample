import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  playerUpMovement,
  playerDownMovement,
  playerRightMovement,
  playerLeftMovement,
  playerIdleMovement,
} from "../utils/textureManager";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import calcDistance from "../utils/calcDistance";

function closest(arr, val, fallback) {
  if (!arr.length) {
    return fallback;
  }
  return arr.reduce((a, b) => {
    return Math.abs(b - val) < Math.abs(a - val) ? b : a;
  });
}

const Player = () => {
  const { moveForward, moveBackward, moveLeft, moveRight } =
    useKeyboardControls();

  const { camera } = useThree();
  const ref = useRef();

  // api.position.subscribe((e) => {
  //   camera?.position.set(e[0], 5, e[2]);
  // });

  useFrame((world) => {
    /*
    console.log(
      JSON.parse(JSON.stringify(ref)).current.object.hasOwnProperty(
        "matrixAutoUpdate"
      )
    );
    console.log(ref.current.matrixAutoUpdate);
    raycaster.setFromCamera(vector, camera);
    const intersects = raycaster.intersectObjects(world.scene.children);
    console.log(intersects);
    */

    const position = ref.current.position;

    const collisions = world.scene.children.filter((e) => {
      return calcDistance(e.position, position) <= 2 && e.name === "Wall";
    });

    const topCollisions = collisions.filter((e) => {
      return (
        (e.position.x === Math.ceil(position.x) ||
          e.position.x === Math.floor(position.x)) &&
        e.position.z <= position.z
      );
    });

    const topClosest =
      closest(
        topCollisions.map((e) => e.position.z),
        position.z,
        -9999
      ) + 1;

    const bottomCollisions = collisions.filter((e) => {
      return (
        (e.position.x === Math.ceil(position.x) ||
          e.position.x === Math.floor(position.x)) &&
        e.position.z >= position.z
      );
    });

    const bottomClosest =
      closest(
        bottomCollisions.map((e) => e.position.z),
        position.z,
        9999
      ) - 1;

    if (ref.current.position.z > topClosest) {
      if (moveForward) {
        ref.current.position.z = Number(
          (ref.current.position.z - 0.1).toFixed(2)
        );
      }
    }

    if (ref.current.position.z < bottomClosest) {
      if (moveBackward) {
        ref.current.position.z = Number(
          (ref.current.position.z + 0.1).toFixed(2)
        );
      }
    }

    if (moveRight) {
      ref.current.position.x = Number(
        (ref.current.position.x + 0.1).toFixed(2)
      );
    }

    if (moveLeft) {
      ref.current.position.x = Number(
        (ref.current.position.x - 0.1).toFixed(2)
      );
    }

    camera?.position.set(ref.current.position.x, 5, ref.current.position.z);
  });

  // useFrame(({ clock: { elapsedTime } }) => {
  //   console.log(elapsedTime);
  // });

  // console.log(moveForward, moveBackward, moveLeft, moveRight);

  const calculateImage = () => {
    if (moveForward) {
      return playerUpMovement;
    }

    if (moveBackward) {
      return playerDownMovement;
    }

    if (moveRight) {
      return playerRightMovement;
    }

    if (moveLeft) {
      return playerLeftMovement;
    }

    return playerIdleMovement;
  };

  return (
    <>
      <mesh position={[2, 0.5, 2]} ref={ref} name="Player">
        <boxBufferGeometry attach="geometry" />
        <meshStandardMaterial
          attach="material"
          transparent={true}
          map={calculateImage()}
        />
      </mesh>
    </>
  );
};

export default Player;
