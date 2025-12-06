import React from "react";

const InputField = ({ id, label, register, rules, errors, ...props }) => (
  <div className="mt-5">
    <label htmlFor={id} className="block font-medium mb-2">
      {label}
    </label>
    <input
      id={id}
      {...register(id, rules)}
      className="w-full border border-gray-300 p-3 rounded-md"
      {...props}
    />
    {errors[id] && (
      <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>
    )}
  </div>
);

export default InputField;
