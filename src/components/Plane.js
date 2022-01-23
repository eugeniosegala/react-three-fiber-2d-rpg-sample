import React, { useRef } from "react";

const Plane = (props) => {
  const ref = useRef();
  return (
    <mesh ref={ref} name="plane">
      <planeBufferGeometry attach="geometry" args={[200, 200]} />
      <meshStandardMaterial attach="material" color={props.colour} />
    </mesh>
  );
};

export default Plane;
