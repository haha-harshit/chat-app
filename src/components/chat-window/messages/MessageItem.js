import React from 'react'
import TimeAgo from 'timeago-react';
import { useProfile } from '../../../context/profile.context';
import { ProfileAvatar } from '../../ProfileAvatar';

export const MessageItem = ({message}) => {

    const profile = useProfile();
    const {author, createdAt, text} = message;

    const isMe = author.name === profile.profile.name;

    const isOther = author.name !== profile.profile.name;

    console.log(author.name);
    console.log(profile.profile.name);


    return (
        <div>

            {/* is it me sending? */}
            {
                isMe && 
                <li className="padded mb-1">
                    <div>
                    <p className="float-right">
                    <div className="d-flex align-items-center font-bolder mb-1">
                        <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="s"/>
                        
                        <TimeAgo
                            datetime={createdAt} 
                            className="font-normal text-black-45 ml-2"
                        />
                    </div>
                    <div>
                        <span className="word-break-all">{text}</span>
                    </div>
                    </p>
                    </div>
                </li>
            }

            {/* if other person's message */}
            {
                isOther &&     
                <li className="padded mb-1">
                    <div className="d-flex align-items-center font-bolder mb-1">
                        <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="s"/>
                        <span className="ml-2"><strong>{author.name}</strong></span>
                        <TimeAgo
                            datetime={createdAt} 
                            className="font-normal text-black-45 ml-2"
                        />
                    </div>
                    <div>
                        <span className="word-break-all">{text}</span>
                    </div>
                </li>
            }
        </div>
    )
}
