import React from 'react';
import { Channel, useChatContext, MessageTeam } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType}) => {
  const { channel } = useChatContext();
  
  if(isCreating){
    return(
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
      </div>
    )
  }
  
  if(isEditing){
    return(
      <div>
        <EditChannel setIsEditing={setIsEditing}/>
      </div>
    )
  }
  
  const EnptyState = () => {
    return(
      <div className="channel-empty__container">
        <p className="channel-empty__first">This is the hoginning of your chat hitory</p>
        <p className="channel-empty__second">Send message, attachments, links, emojis, and more</p>
      </div>
    )
  }

  return(
    <div className="channel__container">
      <Channel
        EnptyStateIndicator={EnptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps}/>}
      >
        <ChannelInner setIsEditing={setIsEditing}/>
      </Channel>
    </div>
  	)
}

export default ChannelContainer;