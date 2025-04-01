import React from "react";

const TextInputField = (props) => {
  return (
    <div
      style={{
        backgroundColor: props?.bgColor,
        border: props.border,
        borderColor: props.borderColor,
        visibility: props?.visibility,
      }}
      className={`w-full rounded-lg px-4 py-[12px] flex items-center ${props.className}`}
    >
      <div className="text-sm dark:text-white text-black font-medium m-0 whitespace-nowrap min-w-[100px]">
        {props?.label}
      </div>
      <div className="flex w-full gap-[16px]">
        {props.component ? (
          props.component
        ) : (
          <input
            {...props}
            readOnly={props.readOnly}
           
            className={`w-full bg-transparent border-none outline-none ml-2 dark:text-white text-black placeholder-gray-400 text-right ${props.inputClass}`}
          />
        )}
        {props?.rightTextValue && <p className="">{props?.rightTextValue}</p>}
      </div>
    </div>
  );
};

export default TextInputField;
