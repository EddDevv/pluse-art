import  {useState} from 'react';
import {useValidation} from "./useValidation";

export const useInputV = ( initialValue, validations, domen ) => {
    const [value,setValue]=useState(initialValue);
    const [isDirty,setDirty]=useState(false);
    const valid=useValidation( value, validations, domen);

    const onChange=(e)=>{
        setDirty(false)
        setValue(e?.target?.value)
    }

    const onBlur =(e)=>{
        if (domen && e?.target?.value === ''){
            setDirty(false)
            return
        }
        setDirty(true)
    }
    const onReset=()=>{
        setValue('')
        setDirty(false)
    }
    const change=(value)=>{
        setValue(value)
    }

    return {
        value,
        onChange,
        onBlur,
        onReset,
        change,
        isDirty,
        ...valid,
        setDirty
    }
};

