import React from 'react'

function SelectList({ index,value,noBlank, list,changeHandler, placeholder, ...others}) {
    return (<select index={index} {...others} onChange={changeHandler} value={ value } >
    {noBlank === true ?  null : <option> -------- </option>}
    {placeholder === undefined ? null : <option value="--------" > {placeholder} </option> }
    { list.map( item => <option key={index + item} > { item } </option> ) }
    </select> )
}

export default SelectList