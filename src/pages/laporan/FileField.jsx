import React from "react";

const FileField = ({ id, label, register, rules, errors, ...props }) => (
  <div className="mt-5">
    <label htmlFor={id} className="block font-medium mb-2">
      {label}
    </label>
    
    <input
      type="file"
      id={id}
      {...register(id, rules)}
      className="block w-full text-sm text-gray-700"
      {...props}
    />
    {errors[id] && (
      <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>
    )}
  </div>
);

export default FileField;
