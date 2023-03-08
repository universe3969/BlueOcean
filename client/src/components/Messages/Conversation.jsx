import React from 'react';

const Conversation = ({ selectedConversation, friendUsername, friendId, userId, userAvatarUrl, friendAvatarUrl }) => {
  console.log("is conversation list come to conversation part? ",selectedConversation);

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
    </div>
  );
};

export default Conversation;
