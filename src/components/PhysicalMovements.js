import useLongPress from "../hooks/useLongPress";

const PhysicalMovements = () => {
  const onKeyLongPress = (type, key, keyCode, code) => {
    document.dispatchEvent(
      new KeyboardEvent(type, {
        key: key,
        keyCode: keyCode,
        code: code,
        which: keyCode,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    );
  };

  const longWPressEvent = useLongPress(
    () => onKeyLongPress("keydown", "W", 87, "KeyW"),
    null,
    {
      shouldPreventDefault: true,
      delay: 0,
      onClear: () => onKeyLongPress("keyup", "W", 87, "KeyW"),
    }
  );

  const longSPressEvent = useLongPress(
    () => onKeyLongPress("keydown", "S", 83, "KeyS"),
    null,
    {
      shouldPreventDefault: true,
      delay: 0,
      onClear: () => onKeyLongPress("keyup", "S", 83, "KeyS"),
    }
  );

  const longAPressEvent = useLongPress(
    () => onKeyLongPress("keydown", "A", 65, "KeyA"),
    null,
    {
      shouldPreventDefault: true,
      delay: 0,
      onClear: () => onKeyLongPress("keyup", "A", 65, "KeyA"),
    }
  );

  const longDPressEvent = useLongPress(
    () => onKeyLongPress("keydown", "D", 68, "KeyD"),
    null,
    {
      shouldPreventDefault: true,
      delay: 0,
      onClear: () => onKeyLongPress("keyup", "D", 68, "KeyD"),
    }
  );

  return (
    <div className="controls">
      <button {...longWPressEvent}>UP</button>
      <button {...longSPressEvent}>DOWN</button>
      <button {...longDPressEvent}>RIGHT</button>
      <button {...longAPressEvent}>LEFT</button>
    </div>
  );
};

export default PhysicalMovements;
