import React, { useState } from 'react';
import axios from 'axios';


const Conversation = ({ selectedConversation, friendUsername, friendId, userId, userAvatarUrl, friendAvatarUrl, setSelectedConversation, updateConversationList }) => {

  console.log("how about the props sending in conversation", { selectedConversation, friendUsername, friendId, userId, userAvatarUrl, friendAvatarUrl, setSelectedConversation, updateConversationList });

  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage.trim() === '') {
      alert('Please enter a message');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/messages/messages', {
        fromId: userId,
        toId: friendId,
        body: newMessage,
      });
      const message = response.data;
      setNewMessage('');
      setSelectedConversation([...selectedConversation, message]);
      const updatedConversation = { ...selectedConversation[0], lastMessage: message.body, lastMessageDate: new Date().toLocaleDateString() };
      updateConversationList(updatedConversation);
    } catch (error) {
      console.error('Failed to send message.', error);
    }
  };

  const isMessageEmpty = newMessage.trim() === '';

  return (
    <div className="conversation-page">
      <h2>{friendUsername}</h2>
      <div className="message-history">
        {selectedConversation.map((message, index) => (
          <div key={index} className={`${message.fromId === friendId ? "friend-message" : "user-message"}`}>
            <div className={`message-sender ${message.fromId === friendId ? "friend-sender" : "user-sender"}`}>
              <img src={message.fromId === friendId ? friendAvatarUrl : userAvatarUrl} className="sender-avatar" />
            </div>
            <div className="message-text">{message.body}</div>
          </div>
        ))}
      </div>
      <form className="conversation-text-form" onSubmit={handleSubmit}>
        <input
          className="conversation-type-area"
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleNewMessageChange}
        />

        <button type="submit" disabled={isMessageEmpty}>Send</button>

      </form>
    </div>
  );
};

export default Conversation;
