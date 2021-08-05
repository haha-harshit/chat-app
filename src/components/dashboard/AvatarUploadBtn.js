import React, { useState } from 'react'
import { Alert, Button, Modal } from 'rsuite'
import { useModalState } from '../../misc/custom-hooks'

const fileInputTypes = '.png, .jpeg, .jpg';

// acccepted MIME types
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];

// helper function for check on valid MIME type
const isValidFile = file => acceptedFileTypes.includes(file.type);


export const AvatarUploadBtn = () => {
    // for creating modal - used custom hook that we already created
    const{isOpen, open, close} = useModalState()
    
    const [img, setImg] = useState(null);

    // on selection of files - we get an array of files
    const onFileInputChange = (ev) => {
        const currFiles = ev.target.files;

        // we need the first in the array and only one
        if(currFiles.length === 1){
            const file = currFiles[0];

            if(isValidFile(file)){
                console.log('VALID');
                // set to state
                setImg(file);
                // open modal
                open();

            }else{
                console.log(file.type)
                Alert.warning(`Wrong file type ${file.type}`, 4000);
            }

        }
    }

    return (
        <div className="mt-3 text-center">
            
            <label htmlFor="avatar_upload" className="d-block cursor-pointer padded">
                Select New Avatar
                <input
                    id="avatar_upload"
                    type="file"
                    className="d-none"
                    accept={fileInputTypes}
                    onChange={onFileInputChange}     
                />
            </label>

            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        Adjust and Upload new avatar!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    xxx
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance="ghost">
                        Upload new avatar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
