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

  const fetchConversationHistory = (friendId) => {
    axios
      .get(`http://localhost:3000/api/messages/${user.id}/${friendId}`)
      .then(response => {
        const messages = response.data.map((message) => {
          const friendUsername = message.friend_username;
          const fromId = message.from_id;
          const toId = message.to_id;
          const friendId = fromId === user.id ? toId : fromId;
          const userId = fromId === user.id ? fromId : toId;
          const userAvatarUrl = userId === user.id ? message.sender_avatar_url : message.receiver_avatar_url;
          const friendAvatarUrl = friendId === user.id ? message.sender_avatar_url : message.receiver_avatar_url;
          const body = message.body;
          return { friendUsername, fromId, toId, friendId, userId, userAvatarUrl, friendAvatarUrl, body };
        });
        setSelectedConversation(messages);
      })
      .catch(err => {
        console.log(err);
      });
  };


  const handleConversationClick = (conversation) => {
    console.log("what is conversation looks like : ", conversation)
    fetchConversationHistory(conversation.id)
  }

  return (
    <div className='message-main'>
      {converList ? (
        <ConversationList onConversationClick={handleConversationClick} converList={converList}/>
      ) : (
        <p>Loading...</p>
      )}
      {selectedConversation && (
        <Conversation
          friendUsername={selectedConversation[0].friendUsername}
          friendId={selectedConversation[0].friendId}
          userId={selectedConversation[0].userId}
          userAvatarUrl={selectedConversation[0].userAvatarUrl}
          friendAvatarUrl={selectedConversation[0].friendAvatarUrl}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
        )}
    </div>
  );
}

export default Messages;