import useLongPress from "../hooks/useLongPress";

const MobileMovements = () => {
  const onKeyLongPress = (type = "keydown") => {
    document.dispatchEvent(
      new KeyboardEvent(type, {
        key: "W",
        keyCode: 87,
        code: "KeyW",
        which: 87,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    );
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 0,
    onClear: () => onKeyLongPress("keyup"),
  };

  const longWPressEvent = useLongPress(
    () => onKeyLongPress(),
    null,
    defaultOptions
  );

  return (
    <>
      <button {...longWPressEvent}>UP</button>
      <button {...longWPressEvent}>DOWN</button>
    </>
  );
};

export default MobileMovements;
