import useLongPress from "../hooks/useLongPress";

const PhysicalMovements = () => {
  const onKeyLongPress = (type) => {
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

  const longWPressEvent = useLongPress(() => onKeyLongPress("keydown"), null, {
    shouldPreventDefault: true,
    delay: 0,
    onClear: () => onKeyLongPress("keyup"),
  });

  return (
    <>
      <button {...longWPressEvent}>UP</button>
      <button {...longWPressEvent}>DOWN</button>
    </>
  );
};

export default PhysicalMovements;
