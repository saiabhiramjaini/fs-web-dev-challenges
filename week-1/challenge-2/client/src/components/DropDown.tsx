import React, { useState } from 'react';

interface DropDownProps {
  options: string[];
  initialValue: string;
  onValueChange: (value: string) => void;
}

export const DropDown: React.FC<DropDownProps> = ({
  options,
  initialValue,
  onValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);

  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleValueChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};