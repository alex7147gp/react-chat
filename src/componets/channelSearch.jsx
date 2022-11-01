import React, { useState, useEffect } from 'react';
import { SearchIcon } from '../assets/SearchIcon.js';
import { useChatContext } from 'stream-chat-react';
import { ResultsDropdown } from './'

const ChannelSearch = ({ setToggleContainer }) => {
    
    const { client, setActiveChannel } = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannel, setTeamChannel] = useState();
    const [directChannel, setDirectChannel] = useState();

    useEffect(() => {
      
      if(!query){
        setTeamChannel([]);
        setDirectChannel([]);
      }

    }, [query])

   const getChannels = async (text) => {
     try{
        const channelResponsive = client.queryChannels({
          type: 'team',
          name: {$autocomplete: text},
          members: {$$in: [client.userID]}
        });
        const userResponsive = client.queryUsers({
          id: { $ne: client.userID },
          name: { $autocomplete : text }
        });

        const [channel, { users }] = await Promise.all([channelResponsive, userResponsive]);
        if(channel.length) setTeamChannel(channel);
        if(users.length) setDirectChannel(users);

     }  

     catch (error) {
     	setQuery('');
     }
   }

    const onSearch = (event) => {
    	event.preventDefault();

    	setLoading(true);
    	setQuery(event.target.value);
    	getChannels(event.target.value)
    }

    const setChannel = (channel) => {
      setQuery('');
      setActiveChannel(channel);
    }

	return(
	  <div className="channel-search__container">
	    <div className="channel-search__input__wrapper">
	      <div className="channel-search__input__icon">
	        <SearchIcon/>
	      </div>
          <input 
            className="channel-search__input__text"
            placeholder="Search"
            type="text"
            value={query}
            onChange={onSearch}
          />
	    </div>
      { query && (
        <ResultsDropdown
          teamChannel={teamChannel}
          directChannel={directChannel}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
	  </div>
	)
}

export default ChannelSearch;