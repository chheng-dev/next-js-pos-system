import React, { Component } from "react";
import Select from 'react-select'

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || (props.items && props.items.length > 0 ? props.items[0] : ""),
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
        backgroundColor: '#f3f4f6',
        borderColor: '#6366f1',     
        boxShadow: 'none',
        '&:hover': {
          borderColor: '#4f46e5',
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
        <label htmlFor="selectLable" className="text-xs">{label}</label> <span className="text-red-600">*</span>
        <Select 
          options={items} 
          value={value}
          placeholder={placeholder}
          labelPlacement="outside"
          onChange={this.handleChange}
          className="max-w-full mt-2 bg-secondary-400"
          styles={customStyles} 
          required={this.props.isRequired}
          defaultValue="Select Menu"
        />
      </div>
    );
  }
}

export default CustomSelect;
