import React from 'react';


const ConversationListEntry = ({conversation, onClick}) => {
  // console.log("props in conList entry?",conversation )

  const {avator, username, lastMessage, lastMessageDate} = conversation;

  const formattedDate = new Date(lastMessageDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  });

  return (
    <div className="conversation-list-entry" onClick={onClick}>
      <div className="conversation-list-entry-avatar">
        <img src={avator} alt={username} />
      </div>
      <div className="conversation-list-entry-info">
        <h2 className="conversation-list-entry-username">{username}</h2>
        <p className="conversation-list-entry-last-message">{lastMessage}</p>
        <span className="conversation-list-entry-last-message-date">{formattedDate}</span>
      </div>
    </div>
  );
}

export default ConversationListEntry;