import React from 'react';
import Dropdown from 'react-dropdown';

// const renderButton = (title, className, isFlag = false, isCreate = false, isDashboard = false, isReport = false, isTile = false) => {
//     return (
//         <button
//         className={className}
//         disabled={!isFlag || is}
//         onClick={() => {
//           if (this.report) {
//             this.report.fullscreen();
//           }
//         }}
//       >
//         {title}
//       </button>
//     );
//   };

const renderInput = (title, name, value, onChange, isMandatory = false, isDisabled = false) => {
    return (
      <span>
        <b className="fieldName">{title}</b>
        <input
          name={name}
          onChange={(e) => onChange(e)}
          value={value}
          readOnly={isDisabled}
          required={isMandatory}
        />
      </span>
    );
  };

  const renderRadioInput = (title, checked, name, value, onChange) => {
    return (
        <span>
        <input
          checked={checked}
          type="radio"
          value={value}
          name={name}
          onChange={(e) => onChange(e)}
        />
        {title}
      </span>
    );
  };

  const renderDropdown = (title, name, options, value, onSelect) => {
    return (
      <span>
        <b className="fieldName">{title}</b>
        <Dropdown
          onChange={onSelect(name)}
          options={options}
          value={value}
        />
      </span>
    );
  };


  export { renderInput, renderRadioInput, renderDropdown };