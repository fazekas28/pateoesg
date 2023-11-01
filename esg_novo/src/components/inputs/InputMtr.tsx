import React, { ReactNode, useState } from 'react';

interface InputMtrProps {
 children: ReactNode;
 newState: (state: string) => void;
 label: string;
 isNumber?: boolean;
 initialValue?: string;
 isInvisible?: boolean;
 isSelect?: boolean;
 value: string;
 max?: number; // Add max prop for the maximum value
}

function InputMtr(props: InputMtrProps) {
 const [error, setError] = useState<string | null>(null);

 const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const newValue = event.currentTarget.value;
  if (props.isNumber) {
   const numericValue = parseFloat(newValue);
   if (!isNaN(numericValue)) {
    if (props.max && numericValue > props.max) {
     setError(`Volume máximo em TON ${props.max}`);
    } else {
     setError(null);
    }
   }
  }
  props.newState(newValue);
 };

 const containerStyle = props.isInvisible ? { display: 'none' } : { display: 'block' };

 return (
  <div className="flex flex-col justify-between items-start" style={containerStyle}>
   <label style={containerStyle}>{props.label}</label>
   {props.isSelect ? (
    <select
     value={props.value}
     onChange={handleChange}
     className="border-gray-400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none"
    >
     {props.children}
    </select>
   ) : (
    <div>
     <input
      type={props.isNumber ? 'number' : 'date'}
      value={props.value}
      onChange={handleChange}
      className="border-gray-400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none"
     />
     {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
   )}
  </div>
 );
}

export default InputMtr;
