import React from "react";

export const useSelected = <T>() => {
  const [active, setAtive] = React.useState(false);
  const [selected, setSelected] = React.useState<T | null>(null);

  const onSelected = (item: T) => {
    setAtive(true);
    setSelected(item);
  };

  const close = () => {
    setAtive(false);
    setSelected(null);
  };

  return {
    active,
    selected,
    onSelected,
    close,
  };
};
