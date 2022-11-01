import React, { useState }from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './componets';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = 'wt4m343hzy5e';

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  }, authToken);

}

console.log(authToken);


const App = () => {

  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [very, setVery] = useState(false) 
  
  console.log(very);  

  if(!very) return <Auth very={very} setVery={setVery}/>
	else {return(
      <div className="app__wrapper">
        <Chat client={client} theme="team light">
            <ChannelListContainer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
            <ChannelContainer 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              createType={createType}
              setIsEditing={setIsEditing}
            />
        </Chat>
      </div>
	)
  }
}

export default App;