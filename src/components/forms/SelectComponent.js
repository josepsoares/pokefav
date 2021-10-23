import React from 'react';
import { Col } from 'reactstrap';
import SelectStyles from '../styles/SelectStyles';
import Select from 'react-select';

const SelectComponent = (title, name, value, functionOnChange, options, key) => {
    return (
        <Col xs='12' md='6' key={key} className='my-2 p-md-0'>
            <h5 className='col-12'>{title}</h5>
            <Select required
                name={name}
                className='w-75 mx-auto text-center my-2'
                styles={SelectStyles}
                value={value}
                onChange={functionOnChange}
                options={options}
                isSearchable={false}
            />
        </Col>
    )
}

export default SelectComponent