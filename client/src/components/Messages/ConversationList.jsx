import React from 'react';
import ConversationListEntry from './ConversationListEntry.jsx';


export default function ConversationList({converList}) {
  console.log("is props coming to the conver list ", converList)

  return (
    <div className="conversation-history-list">
      {converList.map((conversation) => (
        <ConversationListEntry key={conversation.id} conversation={conversation}/>
      ))}

    </div>
  )
}

