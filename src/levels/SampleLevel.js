import { useState } from "react";
import {
  Stats,
  // OrbitControls
} from "@react-three/drei";

import Plane from "../components/Plane";
import Player from "../components/Player";
import Object from "../components/Object";
import Coin from "../components/Coin";
import { mapDataString } from "../utils/mapDataString";
import { chest, orb } from "../utils/textureManager";

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
# · · · · · · · · · · · · · · · #
# · · · T · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# · · · C · · · C · · · C · · · #
# · · · · · C · · · C · · · · · #
# · · · C · · · C · · · C · · · # # # # # # # # # # # # # # # #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · # 
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · # # # # # # # # #
# · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · · · · · C C C · #
# # # # # # # · · · # # # # # # # · · · · · · · · · · · · · · · · · · · · · · #
· · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · # # # # # # # # #
· · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · #
· · · · · · · · · · · · · · · · # · · · · · · · · · · · · · · #
· · · · · · · · · · · · · · · · # # # # # # # # # # # # # # # #
`);

const resolveMapTile = (type, x, y) => {
  const key = `${x}-${y}`;

  switch (type) {
    case "#":
      return <Object key={key} position={[x, 0.5, y]} type="Static" />;
    case "T":
      return <Object key={key} position={[x, 0.5, y]} texture={chest} />;
    case "C":
      return <Coin key={key} position={[x, 0.5, y]} />;
    default:
      return null;
  }
};

const SampleLevel = () => {
  const [colour, setColour] = useState("#7E370C");

  return (
    <>
      <ambientLight intensity={0.1} />
      <Plane position={[0, 0, 0]} colour={colour} />
      <Player />
      {mapData.map((row, y) =>
        row.map((type, x) => resolveMapTile(type, x, y))
      )}
      {/*Elements outside mapData*/}
      <Object
        mass={1}
        position={[10, 0.5, 20]}
        onCollide={(e) => {
          if (e.body.name === "Player") {
            setColour("#D4AC2B");
          }
        }}
        texture={orb}
      />
      <Object
        mass={1}
        position={[20, 0.5, 20]}
        onCollide={(e) => {
          if (e.body.name === "Player") {
            setColour("#ff45ab");
          }
        }}
        texture={orb}
      />
      <spotLight
        position={[10, 10, 10]}
        angle={0.5}
        intensity={1}
        castShadow={true}
        penumbra={1}
      />
      {/* <OrbitControls makeDefault /> */}
      <Stats className="stats" />
    </>
  );
};

export default SampleLevel;
