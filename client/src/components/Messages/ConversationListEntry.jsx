import React from 'react';


const ConversationListEntry = ({conversation}) => {
  // console.log("props in conList entry?",conversation )

  const {avator, username, lastMessage, lastMessageDate} = conversation;

  return (
    <div className="conversation-list-entry">
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