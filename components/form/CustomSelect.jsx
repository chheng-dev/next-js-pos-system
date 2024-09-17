import React, { Component } from "react";
// import { Select, SelectItem } from "@nextui-org/react";
import Select from 'react-select'

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ""
    };
  }

  handleChange = (value) => {
    this.setState({ value });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { label, placeholder, items } = this.props;
    const { value } = this.state;
    const customStyles = {
      control: (provided) => ({
        ...provided,
        backgroundColor: '#f3f4f6', // Customize the background color
        borderColor: '#6366f1',     // Customize the border color
        boxShadow: 'none',
        '&:hover': {
          borderColor: '#4f46e5',   // Hover state for border
        },
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#111214' : state.isFocused ? '#c7d2fe' : 'white',
        color: state.isSelected ? 'white' : 'black',
        zIndex:999999,
        position: 'relative',
        '&:hover': {
          backgroundColor: '#e0e7ff', 
        },
      }),
    };

    return (
      <div className="mb-3">
        {/* <Select
          value={value}
          placeholder={placeholder}
          label={label}
          labelPlacement="outside"
          onChange={this.handleChange}
          className="max-w-full"
        >
          {items.map((item) => (
            <SelectItem key={item.key} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select> */}
        <label htmlFor="selectLable">{label}</label>
        <Select 
          options={items} 
          value={value}
          placeholder={placeholder}
          labelPlacement="outside"
          onChange={this.handleChange}
          className="max-w-full mt-2 bg-secondary-400"
          styles={customStyles} 
        />
      </div>
    );
  }
}

export default CustomSelect;
