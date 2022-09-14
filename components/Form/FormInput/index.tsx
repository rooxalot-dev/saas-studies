import React, { InputHTMLAttributes } from "react";
import { useForm, useFormContext, UseFormRegister } from "react-hook-form";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  required?: boolean;
};

type FormSelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  name: string;
  options: HTMLOptionElement[];
};

export const FormInput: React.FC<FormInputProps> = ({ name, required = false, ...rest }: FormInputProps) => {
  const methods = useFormContext();

  return (
    <input { ...rest } {...methods.register(name, { required })} />
  );
}

export const FormSelect: React.FC<FormSelectProps> = ({ options, name, ...rest }: FormSelectProps) => {
  const methods = useFormContext();

  return (
    <select {...methods.register(name)} {...rest}>
      {options.map(option => (
        <option key={option.text + ' - ' + option.value} value={option.value}>
          {option.text ?? option.value}
        </option>
      ))}
    </select>
  );
}


