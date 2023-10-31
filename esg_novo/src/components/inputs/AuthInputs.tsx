import { useState } from 'react';

interface AuthInputProps {
 newState: (state: string) => void;
 label: string;
 isPassword?: boolean;
 initialValue?: string;
 isInvisible?: boolean; // Add isInvisible prop
}

function AuthInput(props: AuthInputProps) {
 const [value, setValue] = useState(props.initialValue || '');

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = event.currentTarget.value;
  setValue(newValue);
  props.newState(newValue);
 }

 const inputStyle = props.isInvisible ? { display: 'none' } : { display: 'block' };

 return (
  <div className="flex flex-col justify-between items-start">
   <label>{props.label}</label>
   <input
    type={props.isPassword ? "password" : "text"}
    value={value}
    onChange={handleChange}
    className="border-gray-400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none"
    style={inputStyle} // Apply the style conditionally
   />
  </div>
 );
}

export default AuthInput;

