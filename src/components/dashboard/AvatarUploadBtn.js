import React from 'react'

export const AvatarUploadBtn = () => {
    
    const fileInputTypes = ".png, .jpeg, .jpg"
    
    return (
        <div className="mt-3 text-center">
            <label htmlFor="avatar_upload" className="d-block cursor-pointer padded">
                Select New Avatar
                <input id="avatar_upload" type="file" className="d-none" accept={fileInputTypes}/>
            </label>
        </div>
    )
}
