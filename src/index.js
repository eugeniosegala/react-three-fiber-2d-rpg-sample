import React from "react";
import ReactDOM from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import SampleLevel from "./levels/SampleLevel";

import "./index.css";

const Game = () => {
  return (
    <>
      <Canvas
        antialias={false}
        orthographic
        camera={{ zoom: 50, position: [0, 5, 0] }}
      >
        <Physics
          broadphase="SAP"
          defaultContactMaterial={{
            contactEquationRelaxation: 4,
            friction: 0.05,
          }}
        >
          <SampleLevel />
        </Physics>
      </Canvas>
    </>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
