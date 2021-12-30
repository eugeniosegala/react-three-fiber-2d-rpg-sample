import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { Stats } from "@react-three/drei";
import "./index.css";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} name="plane">
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color={props.colour} />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({ ...props }));

  return (
    <mesh position={[5, 0, 0.5]} ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  );
}

function Player({ moveForward, moveBackward, moveLeft, moveRight }) {
  const [ref, api] = useBox(() => ({ mass: 10, position: [1, 1.5, 0] }));
  const { camera } = useThree();

  api.position.subscribe((e) => {
    camera?.position.set(e[0], 5, e[2]);
  });

  useFrame(() => {
    if (moveForward || moveBackward || moveRight || moveLeft) {
      api.velocity.set(moveRight || moveLeft, 0, moveForward || moveBackward);
    }
  });

  return (
    <mesh ref={ref} name="Cube2" position={[0, 0, 1.5]}>
      <boxGeometry />
      <meshLambertMaterial color="red" />
    </mesh>
  );
}

function App() {
  const { moveForward, moveBackward, moveLeft, moveRight } =
    useKeyboardControls();

  const [colour, setColour] = useState("green");

  return (
    <>
      <Canvas camera={{ fov: 135, near: 0.5, far: 2000, position: [0, 5, 0] }}>
        <Physics>
          <Plane position={[0, 0, 0]} colour={colour} />
          <Player
            moveForward={moveForward}
            moveBackward={moveBackward}
            moveLeft={moveLeft}
            moveRight={moveRight}
          />
          <Cube mass={1000} position={[5, 1.5, 0]} />
          <Cube mass={1} position={[3, 1.5, 0]} />
          <Cube
            mass={1}
            position={[10, 1.5, 20]}
            onCollide={(e) => {
              if (e.body.name === "Cube2") {
                setColour("blue");
              }
            }}
          />
          <Cube
            mass={1}
            position={[20, 1.5, 20]}
            onCollide={(e) => {
              if (e.body.name === "Cube2") {
                setColour("blue");
              }
            }}
          />
          <ambientLight intensity={0.1} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.5}
            intensity={1}
            castShadow
            penumbra={1}
          />
          {/*<OrbitControls makeDefault />*/}
          <Stats className="stats" />
        </Physics>
      </Canvas>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
