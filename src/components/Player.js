import React, { useRef } from "react";
import { Vector3 } from "three";
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

const vector2 = new Vector3();
const vector3 = new Vector3();
const vector4 = new Vector3();
const vector5 = new Vector3();

const Player = () => {
  const { moveForward, moveBackward, moveLeft, moveRight } =
    useKeyboardControls();

  const { camera } = useThree();
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  // api.position.subscribe((e) => {
  //   camera?.position.set(e[0], 5, e[2]);
  // });

  useFrame((world) => {
    const obj2 = ref2.current.getWorldPosition(vector2);
    const obj3 = ref3.current.getWorldPosition(vector3);
    const obj4 = ref4.current.getWorldPosition(vector4);
    const obj5 = ref5.current.getWorldPosition(vector5);

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

    const topCollisions = world.scene.children.filter((e) => {
      return calcDistance(e.position, obj2) <= 1 && e.name !== "player-top";
    });

    const rightCollisions = world.scene.children.filter((e) => {
      return calcDistance(e.position, obj3) <= 1 && e.name !== "player-right";
    });

    const leftCollisions = world.scene.children.filter((e) => {
      return calcDistance(e.position, obj4) <= 1 && e.name !== "player-left";
    });

    const bottomCollisions = world.scene.children.filter((e) => {
      return calcDistance(e.position, obj5) <= 1 && e.name !== "player-bottom";
    });

    const topMaxCurrentPos = topCollisions[0]?.position.z + 1 || -99;
    const rightMaxCurrentPos = rightCollisions[0]?.position.x - 1 || 99;
    const leftMaxCurrentPos = leftCollisions[0]?.position.x + 1 || -99;
    const bottomMaxCurrentPos = bottomCollisions[0]?.position.z - 1 || 99;

    if (ref.current.position.z > topMaxCurrentPos) {
      if (moveForward) {
        ref.current.position.z = Number(
          (ref.current.position.z - 0.1).toFixed(2)
        );
      }
    }

    if (ref.current.position.z < bottomMaxCurrentPos) {
      if (moveBackward) {
        ref.current.position.z = Number(
          (ref.current.position.z + 0.1).toFixed(2)
        );
      }
    }

    if (ref.current.position.x < rightMaxCurrentPos) {
      if (moveRight) {
        ref.current.position.x = Number(
          (ref.current.position.x + 0.1).toFixed(2)
        );
      }
    }

    if (ref.current.position.x > leftMaxCurrentPos) {
      if (moveLeft) {
        ref.current.position.x = Number(
          (ref.current.position.x - 0.1).toFixed(2)
        );
      }
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
        <mesh position={[0, 0.5, -1]} ref={ref2} name="player-top">
          <boxBufferGeometry attach="geometry" />
          <meshStandardMaterial attach="material" />
        </mesh>
        <mesh position={[1, 0.5, 0]} ref={ref3} name="player-right">
          <boxBufferGeometry attach="geometry" />
          <meshStandardMaterial attach="material" />
        </mesh>
        <mesh position={[-1, 0.5, 0]} ref={ref4} name="player-left">
          <boxBufferGeometry attach="geometry" />
          <meshStandardMaterial attach="material" />
        </mesh>
        <mesh position={[0, 0.5, 1]} ref={ref5} name="player-bottom">
          <boxBufferGeometry attach="geometry" />
          <meshStandardMaterial attach="material" />
        </mesh>
      </mesh>
    </>
  );
};

export default Player;
