import React from "react";
import { Input } from "@nextui-org/react";
import { EyeIcon, EyeOff } from "lucide-react";

export default function TextField({ type = "text", label, placeholder, name, onChange, value, required, isVisible, toggleVisibility, endContent, error }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-end gap-4 mb-3">
        <Input
          size="md"
          type={type}
          label={label}
          labelPlacement="outside"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          endContent={
            endContent === true && (
              <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                {isVisible ? (
                  <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            )
          }
        />
      </div>
    </div>
  );
}


