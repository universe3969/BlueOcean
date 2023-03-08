import React from 'react';


const ConversationListEntry = ({conversation, onClick}) => {
  // console.log("props in conList entry?",conversation )

  const {avator, username, lastMessage, lastMessageDate} = conversation;

  return (
    <div className="conversation-list-entry" onClick={onClick}>
      <img src={avator} alt={username} />
      <div className="conversation-info">
        <h2>{username}</h2>
        <p>{lastMessage}</p>
        <span>{lastMessageDate}</span>
      </div>
    </div>
  )
}

export default ConversationListEntry;