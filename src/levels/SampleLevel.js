import { useState } from "react";
import { Stats } from "@react-three/drei";

import { useKeyboardControls } from "../hooks/useKeyboardControls";

import Plane from "../components/Plane";
import Player from "../components/Player";
import Object from "../components/Object";
import Trigger from "../components/Trigger";

const SampleLevel = () => {
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    lastMovement,
    tileMovement,
  } = useKeyboardControls();

  const [colour, setColour] = useState("#7E370C");

  // console.log(
  //   moveForward,
  //   moveBackward,
  //   moveLeft,
  //   moveRight,
  //   lastMovement,
  //   tileMovement
  // );

  return (
    <>
      <Plane position={[0, 0, 0]} colour={colour} />
      <Player
        moveForward={moveForward}
        moveBackward={moveBackward}
        moveLeft={moveLeft}
        moveRight={moveRight}
        tileMovement={tileMovement}
      />
      <Object position={[5, 1, 1]} type="Static" />
      <Object position={[5, 1, 2]} type="Static" />
      <Object position={[5, 1, 3]} type="Static" />
      <Object mass={1} position={[3, 0.5, 0]} />
      <Trigger position={[0, 0.5, 7]} />
      <Trigger position={[1, 0.5, 7]} />
      <Trigger position={[2, 0.5, 7]} />
      <Object
        mass={1}
        position={[10, 0.5, 20]}
        onCollide={(e) => {
          if (e.body.name === "Player") {
            setColour("#D4AC2B");
          }
        }}
      />
      <Object
        mass={1}
        position={[20, 0.5, 20]}
        onCollide={(e) => {
          if (e.body.name === "Player") {
            setColour("#FFCE45");
          }
        }}
      />
      <ambientLight intensity={0.1} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.5}
        intensity={1}
        castShadow={true}
        penumbra={1}
      />
      {/*<OrbitControls makeDefault />*/}
      <Stats className="stats" />
    </>
  );
};

export default SampleLevel;
