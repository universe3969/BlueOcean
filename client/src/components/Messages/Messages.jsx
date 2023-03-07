import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList.jsx';
import Conversation from './Conversation.jsx';
import './Messages.scss';


// Don't change this <main> wrapper, this tag is used in App.scss
export default function Messages({user}) {
  // friends click state
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendClic = (friend) => {
    setSelectedFriend(friend);
  }



  return (
    <div className='message-main'>
      <FriendList onFriendClick={handleFriendClick} friends={friendlist}/>
      <Conversation selectedFriend={selectedFriend} />
    </div>
  );
}