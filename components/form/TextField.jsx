import React from "react";
import { Input } from "@nextui-org/react";

export default function TextField({ type = "text", label, placeholder, name, onChange, value, required, isRequired }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-end gap-4 mb-3">
        <Input
          size="md"
          type={type}
          label={label}
          form={value}
          labelPlacement="outside"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          isRequired={!value ? isRequired : '' }
          className="text-white dark:text-gray-800"
        />
      </div>
    </div>
  );
}


