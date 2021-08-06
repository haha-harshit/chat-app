import React, { useState, useRef } from 'react'
import { Alert, Button, Modal } from 'rsuite'
import AvatarEditor from 'react-avatar-editor'
import { useModalState } from '../../misc/custom-hooks'
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import { ProfileAvatar } from './ProfileAvatar';

const fileInputTypes = '.png, .jpeg, .jpg, .svg';

// acccepted MIME types
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg', 'image/svg'];

// helper function for check on valid MIME type
const isValidFile = file => acceptedFileTypes.includes(file.type);

const getBlob = (canvas) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if(blob){
                resolve(blob);
            }else{
                reject(new Error('File Process Error!'));
            }
        })
    })
}

export const AvatarUploadBtn = () => {

    const {profile} = useProfile();

    // for creating modal - used custom hook that we already created
    const{isOpen, open, close} = useModalState()
    
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const avatarEditorRef = useRef();

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

    const onUploadClick = async () => {
        const croppedCanvas = avatarEditorRef.current.getImageScaledToCanvas();
        setIsLoading(true);
        try {
            const blob = await getBlob(croppedCanvas);

            const avatarFileRef = storage.ref(`/profiles/${profile.uid}`).child('avatar');

            const uploadAvatarResult = await avatarFileRef.put(blob, {
                cacheControl: `public, max-age=${3600 * 24 * 3}`
            });

            const dowloadUrl = await uploadAvatarResult.ref.getDownloadURL();

            const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar');

            await userAvatarRef.set(dowloadUrl);
            setIsLoading(false);
            Alert.success('Avatar has been uploaded', 4000);
            close();

        } catch (err) {
            setIsLoading(false);
            Alert.error(err.message, 4000);
            console.log('error here')
        }
    }

    return (
        <div className="mt-3 text-center">

            <ProfileAvatar src={profile.avatar} name={profile.name} className="width-200 height-200 img-fullsize font-huge"/>

            <div>
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
                                ref={avatarEditorRef}
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
                        <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
                            Upload new avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
