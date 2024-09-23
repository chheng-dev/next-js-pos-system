import React, { useState } from "react";
import { Switch } from "@nextui-org/react";

export default function CustomSwitchButton({ isOpen, onClose }) {
  const [isSelected, setIsSelected] = useState(isOpen);

  const handleToggle = () => {
    setIsSelected(prevState => !prevState);
    if (onClose) onClose(!isSelected);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '8px' }}>Active</span>
      <Switch
        size="sm"
        checked={isSelected}
        onChange={handleToggle}
      />
    </div>
  );
}
