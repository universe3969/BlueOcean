import React, { useState } from 'react';
import axios from 'axios';


const Conversation = ({ selectedConversation, friendUsername, friendId, userId, userAvatarUrl, friendAvatarUrl, setSelectedConversation }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/messages/messages', {
        fromId: userId,
        toId: friendId,
        body: newMessage,
      });
      const message = response.data;
      setNewMessage('');
      setSelectedConversation([...selectedConversation, message]);
    } catch (error) {
      console.error('Failed to send message.', error);
    }
  };

  return (
    <div className="conversation-page">
      <h2>{friendUsername}</h2>
      <div className="message-history">
        {selectedConversation.map((message) => (
          <div className={`message ${message.fromId === friendId ? "friend-message" : "user-message"}`}>
            <div className={`message-sender ${message.fromId === friendId ? "friend-sender" : "user-sender"}`}>
              <img src={message.fromId === friendId ? friendAvatarUrl : userAvatarUrl} className="sender-avatar" />
            </div>
            <div className="message-text">{message.body}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleNewMessageChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Conversation;
