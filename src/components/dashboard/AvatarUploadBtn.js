import React, { useState } from 'react'
import { Alert, Button, Modal } from 'rsuite'
import AvatarEditor from 'react-avatar-editor'
import { useModalState } from '../../misc/custom-hooks'

const fileInputTypes = '.png, .jpeg, .jpg, .svg';

// acccepted MIME types
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg', 'image/svg'];

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

            // check for validation of MIME type
            if(isValidFile(file)){
                console.log('VALID');
                // set to state
                setImg(file);
                // open modal
                open();

            }else{
                console.log(file.type)
                Alert.warning(`Wrong file type ${file.type}`, 4000);
            };
        };
    };

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
                    <div className="d-flex justify-content-center align-items-center h-100">
                        {img && 
                            <AvatarEditor
                            image={img}
                            width={200}
                            height={200}
                            border={10}
                            // color={[255, 255, 255, 0.6]} // RGBA
                            // scale={1.2}
                            borderRadius={100}
                            rotate={0}
                        />
                        }
                    </div>
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
