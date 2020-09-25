const customStyles = {
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition, color: '#ebebd3' };
    },
    option: (provided, state) => ({
        ...provided,
        fontSize: '16px',
        color: state.isSelected ? '#f24643' : '#ffe066',
        backgroundColor: state.isSelected ? '#ffe066' : '#f24643',
    }),
    menu: (provided) => ({
        ...provided,
        fontSize: '16px',
        borderRadius: 0,
        marginTop: 0,
        width: '100%'
    }),
    menuList: (provided) => ({
        ...provided,
        fontSize: '16px',
        backgroundColor: '#f24643',
        color: '#ffe066',
        padding: 0,
        width: '100%'
    }),
    control: (provided, state) => ({
        ...provided,
        fontSize: '16px',
        color: '#ffe066',
        border: '1px solid #ffe066',
        borderRadius: 4,
        backgroundColor: state.isFocused ? '#f24643' : '#1688b9',
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        "&:hover": {
            borderColor: "ffe066"
        }
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#ffe066'
    }),
    placeholder: (provided, state) => ({
        ...provided,
        fontSize: '16px',
        color: state.isFocused ? '#ffe066' : '#ebebd3',
        fontWeight: state.isFocused ? 'normal' : 'light',
    }),
}

export default customStyles