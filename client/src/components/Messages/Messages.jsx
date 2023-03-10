import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList.jsx';
import Conversation from './Conversation.jsx';
import NewConversation from './NewConversation.jsx';
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

  }, [selectedConversation]);

  const fetchConversationHistory = (friendId) => {
    axios
      .get(`http://localhost:3000/api/messages/${user.id}/${friendId}`)
      .then(response => {
        console.log("what is response looks like: ", response.data)
        const messages = response.data.map((message) => {
          const friendUsername = message.friendUsername;
          const fromId = message.fromId;
          const toId = message.toId;
          const friendsId = Number(message.friendId);
          const userId = user.id;
          const userAvatarUrl = message.userAvator;
          const friendAvatarUrl = message.friendAvator;
          const body = message.body;
          return { friendUsername, fromId, toId, friendsId, userId, userAvatarUrl, friendAvatarUrl, body };
        });

        setSelectedConversation(messages);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateConversationList = () => {
    axios.get(`http://localhost:3000/api/messages/${user.id}/messages`)
      .then(response => {
        setConverList(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConversationClick = (conversation) => {
    // console.log("what is conversation looks like : ", conversation)
    fetchConversationHistory(conversation.id)
    updateConversationList();
  }

  return (
    <div className='message-main'>
      {converList ? (
        <ConversationList onConversationClick={handleConversationClick} converList={converList}/>
      ) : (
        <p>Loading...</p>
      )}
      {selectedConversation ? (
        <Conversation
          friendUsername={selectedConversation[0].friendUsername}
          friendId={selectedConversation[0].friendsId}
          userId={selectedConversation[0].userId}
          userAvatarUrl={selectedConversation[0].userAvatarUrl}
          friendAvatarUrl={selectedConversation[0].friendAvatarUrl}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          updateConversationList={updateConversationList}
        />):(
        <NewConversation userId={user.id} updateConversationList={updateConversationList} onConversationClick={handleConversationClick} fetchConversationHistory={fetchConversationHistory} />
        )}

    </div>
  );
}

export default Messages;