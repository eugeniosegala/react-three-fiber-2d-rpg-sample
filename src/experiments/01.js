import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { OrbitControls, Stats } from "@react-three/drei";
import "./index.css";

function Plane(props) {
  // const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

function Cube(props) {
  // const [ref] = useBox(() => ({
  //   mass: 1,
  //   position: [2.5, -2, 0],
  //   rotation: [0, 0, 0],
  //   ...props,
  // }));

  return (
    <mesh position={[1, 0, 0.5]}>
      <boxGeometry />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  );
}

function Player({
  moveForward,
  moveBackward,
  moveLeft,
  moveRight,
  x,
  y,
  setX,
  setY,
}) {
  const ref = useRef();
  const { camera } = useThree();

  // camera.lookAt(x, y, 0);

  camera?.position.set(x, y, 5);

  // const [ref, api] = useBox(() => ({
  //   mass: 1,
  //   position: [props.movement, -2, 0],
  //   rotation: [0, 0, 0],
  //   ...props,
  // }));

  // useEffect(() => {
  //   // api.applyForce(100, 200);
  //   api.position.set(props.movement, -2, 0);
  // }, [props.movement]);

  const movement = 0.1;

  useFrame(() => {
    // ref.current.translateZ(1);
    if (moveForward) {
      setY(y + movement);
    }
    if (moveBackward) {
      setY(y - movement);
    }
    if (moveRight) {
      setX(x + movement);
    }
    if (moveLeft) {
      setX(x - movement);
    }
  });

  return (
    <mesh ref={ref} name="Cube2" position={[x, y, 0.5]}>
      <boxGeometry />
      <meshLambertMaterial color="red" />
    </mesh>
  );
}

function App() {
  const { moveForward, moveBackward, moveLeft, moveRight } =
    useKeyboardControls();

  const [y, setY] = useState(0);
  const [x, setX] = useState(0);

  return (
    <>
      <Canvas camera={{ fov: 135, near: 0.5, far: 2000, position: [0, 0, 5] }}>
        <Plane position={[0, 0, 0]} />
        <Player
          moveForward={moveForward}
          moveBackward={moveBackward}
          moveLeft={moveLeft}
          moveRight={moveRight}
          x={x}
          y={y}
          setY={setY}
          setX={setX}
        />
        <Cube
        // onCollide={(e) => {
        //   console.log("Collision event on BoxTrigger", e);
        // }}
        />
        <ambientLight intensity={0.5} />
        <pointLight intensity={0.5} position={[0, 0, 0.5]} />
        {/*<OrbitControls makeDefault />*/}
        <Stats className="stats" />
      </Canvas>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
