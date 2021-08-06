import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'

export const EditableInput = ({initialValue, onSave, label=null, placeholder="Write your username", emptyMsg="Input is Empty", ...inputProps }) => {
    // input state, set initial input to initialValue i.e. profile.name
    const [input, setInput] = useState(initialValue);

    // editable
    const [isEditable, setIsEditable] = useState(false);

    // on onChange
    const onInputChange = useCallback((value) => {
        setInput(value);
    },[])
    
    const onEditClick = useCallback(() => {
        // reverse the boolean state
        setIsEditable(p => !p);
        // set input value to same as before
        setInput(initialValue);
    }, [initialValue]);

    const onSaveClick = async() => {
        const trimmedValue = input.trim();

        // trim empty spaces
        if(trimmedValue === ''){
            Alert.info(emptyMsg, 4000);
        }

        // check if trimmedValue and initialValue are same then do not run onSave()
        if(trimmedValue !== initialValue){
            await onSave(trimmedValue);       
        }

        // make it un editable after save
        setIsEditable(false);
    };



    return (
        <div>
            {label}

            {/* group of buttons */}
            <InputGroup>
                <Input 
                    {...inputProps}
                    disabled={!isEditable}
                    placeholder={placeholder}
                    value={input}
                    onChange={onInputChange}
                />
                
                {/* for edit */}
                <InputGroup.Button onClick={onEditClick}>
                    <Icon icon={ isEditable ? 'close' : 'edit2' } />
                </InputGroup.Button>

                {/* for save if editable */}
                {isEditable && 
                    <InputGroup.Button onClick={onSaveClick}>
                        <Icon icon="check" />
                    </InputGroup.Button>
                }    
            </InputGroup>
        </div>
    )
}
