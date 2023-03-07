import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList.jsx';
import Conversation from './Conversation.jsx';
import axios from 'axios';
import './Messages.scss';


// Don't change this <main> wrapper, this tag is used in App.scss
const Messages = () => {
  const user = {id: 2}
  // friends click state
  const [converList, setConverList] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(()=> {
    axios.get(`http://localhost:3000/api/messages/${user.id}/messages`)
      .then(response => {
        setConverList(response.data);
      })
      .catch(err => {
        console.log(err);
      })

  }, []);

  const handleConversationClick = (conversation) => {
    setSelectedFriend(conversation);
  }

  return (
    <div className='message-main'>
      {converList ? (
        <ConversationList onFriendClick={handleConversationClick} converList={converList}/>
      ) : (
        <p>Loading...</p>
      )}
      <Conversation selectedConversation={selectedConversation} />
    </div>
  );
}

export default Messages;