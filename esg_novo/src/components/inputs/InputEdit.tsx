import React, { ReactNode, useState } from 'react';

interface InputEditprops {
 children: ReactNode;
 newState: (state: string) => void;
 label: string;
 isNumber?: boolean;
 initialValue?: string;
 isInvisible?: string;
 isSelect?: boolean;
 value: string;
}

function InputEdit(props: InputEditprops) {
 const [selectedValue, setSelectedValue] = useState(props.value);

 const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const newValue = event.currentTarget.value;
  setSelectedValue(newValue);
  props.newState(newValue);
 };

 const containerStyle = props.isInvisible === 'false' ? { display: 'none' } : { display: 'block' };

 return (
  <div className="flex flex-col justify-between items-start" style={containerStyle}>
   <label style={containerStyle}>{props.label}</label>
   {props.isSelect ? (
    <select
     value={selectedValue}
     onChange={handleChange}
     className="border-gray-400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none"
    >
     {props.children}
    </select>
   ) : (
    <input
     type={props.isNumber ? 'number' : 'date'}
     value={selectedValue}
     onChange={handleChange}
     className="border-gray-400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none"
    />
   )}
  </div>
 );
}

export default InputEdit;


