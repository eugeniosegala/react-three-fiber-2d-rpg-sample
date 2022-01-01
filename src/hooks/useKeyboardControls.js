import { useState, useEffect } from "react";

function actionByValue(key) {
  const value = 10;
  const keys = {
    moveForward: -value,
    moveBackward: value,
    moveLeft: -value,
    moveRight: value,
  };
  return keys[key];
}

function actionByKey(key) {
  const keys = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
  };
  return keys[key];
}

export const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    moveForward: 0,
    moveBackward: 0,
    moveLeft: 0,
    moveRight: 0,
    lastMovement: null,
    tileMovement: 0,
  });

  useEffect(() => {
    // Primary movements
    const handleKeyDown = (e) => {
      if (actionByKey(e.code)) {
        setMovement((state) => ({
          ...state,
          [actionByKey(e.code)]: actionByValue(actionByKey(e.code)),
          lastMovement: actionByKey(e.code),
          tileMovement: state.tileMovement === 3 ? 1 : state.tileMovement + 1,
        }));
      }
    };
    // Used to reset keys
    const handleKeyUp = (e) => {
      if (actionByKey(e.code)) {
        setMovement((state) => ({
          ...state,
          [actionByKey(e.code)]: 0,
          tileMovement: 0,
        }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};
