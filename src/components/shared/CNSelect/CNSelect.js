import React, { useState, useEffect, useCallback } from 'react';
import Select, { components } from 'react-select';
import { SVGIcon } from '../SvgIcon/Icon';
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]
const styles = {
  option: (provided, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...provided,
      backgroundColor: isFocused ? '#cbcbcb' : null,
      color: '#484848',
      cursor: 'pointer',
    };
  },
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    borderColor: '#cbcbcb!important',
    cursor: 'pointer',
    height: '50px',
  }),
  menu:(provided) =>({
    ...provided,
    position: 'absolute',
    zIndex: '1001'
  }),
  container: (provided, state) => {
    return {
      ...provided,
      width: state.selectProps.width,
    };
  },
  placeholder: (provided, state) => {
    return {
      ...provided,
    };
  },
  clearIndicator: (provided, state) => {
    return {
      display: 'flex',
      'svg:hover': {
        fill: 'red',
        cursor: 'pointer',
      },
    };
  },
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => {
    return { marginRight: '10px', ...provided };
  },
  singleValue: (provided) => {
    return {
      ...provided,
      fontFamily: 'Nunito, Helvetica, Arial, sans-serif',
      fontWeight: '500',
      color: '#484848',
      fontSize: '14px',
      lineHeight: '1.75',
      color: '#484848',
    };
  },
  placeholder: (provider) => {
    return {
      color: '#484848',
      fontWeight: '500',
      ...provider,
      paddingLeft: '8px',
    };
  },
};

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <SVGIcon
          name={props.selectProps.menuIsOpen ? 'arrowUp' : 'arrowDown'}
          width="12px"
        />
      </components.DropdownIndicator>
    )
  );
};

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {props.children}
        <div>
          {props.isSelected && (
            <SVGIcon name={'tick'} width="15px" style={{ fill: 'red' }} />
          )}
        </div>
      </div>
    </components.Option>
  );
};

export const CNSelect = ({ options, customComponents, ...rest }) => {
  const [selectWidth, setSelectWidth] = useState('20%');

  const handleResize = useCallback(() => {
    if (window.matchMedia('(min-width: 1100px)').matches) setSelectWidth('20%');
    else setSelectWidth('100%');
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectWidth]);

  return (
    <Select
      options={options}
      components={{
        DropdownIndicator,
        Option: CustomOption,
        ...customComponents,
      }}
      isClearable={true}
      // isSearchable={false}
      styles={styles}
      placeholder={'Select...'}
      width={selectWidth}
      {...rest}
    />
  );
};
