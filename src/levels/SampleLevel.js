import { useState } from "react";
import { Stats, OrbitControls } from "@react-three/drei";

import { useKeyboardControls } from "../hooks/useKeyboardControls";

import Plane from "../components/Plane";
import Player from "../components/Player";
import Object from "../components/Object";
import Trigger from "../components/Trigger";

const mapDataString = (str) => {
  const lineBreak = "\n";
  const data = [];
  let line = -1;
  let string = str;
  // strip any break at the end
  if (string[string.length - 1] === lineBreak) {
    string = string.slice(0, -1);
  }
  for (const char of string) {
    if (char === " ") continue;
    if (char === lineBreak) {
      data[++line] = [];
    } else {
      data[line].push(char);
    }
  }
  return data;
};

const resolveMapTile = (type, x, y) => {
  const key = `${x}-${y}`;

  switch (type) {
    case "·":
      return null;
    case "#":
      return <Object key={key} position={[x, 0.5, y]} type="Static" />;
    case "C":
      return <Trigger key={key} position={[x, 0.5, y]} />;
    default:
      return null;
  }
};

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# · · · C · · · C · · · C · · · #
# · · · · · C · · · C · · · · · #
# · · · C · · · C · · · C · · · # # # # # # # # # # # # # # # #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · # 
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · # # # # # # # # #
# · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · · · · · · · · · #
# # # # # # # · · · # # # # # # # · · · · · · · · · · · · · · · · · · · · · · #
· · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · # # # # # # # # #
· · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · #
· · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · #
· · · · · · · · · · · · · · · · # # # # # # # # # # # # # # # #
`);

const SampleLevel = () => {
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    // lastMovement,
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
      {mapData.map((row, y) =>
        row.map((type, x) => resolveMapTile(type, x, y))
      )}
      <Object mass={1} position={[4, 0.5, 2]} />
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
