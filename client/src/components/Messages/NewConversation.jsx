import React, { useState, useEffect } from 'react';
import axios from 'axios';


const NewConversation = ({ userId, onClose, updateConversationList,onConversationClick}) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/messages/${userId}/friends`)
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleFriendSelect = (event) => {
    setSelectedFriendId(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/api/messages/messages/`, {
        fromId: userId,
        toId: Number(selectedFriendId),
        body: messageBody,
      })
      .then((response) => {
        updateConversationList();
        onClose();

        const friendId = response.data.friendId;

        // Check if the selected friend is already in the conversation list
        const existingConversation = converList.find(
          (conversation) => conversation.friendId === friendId
        );

        if (existingConversation) {
          // Navigate to the existing conversation
          handleConversationClick(existingConversation);
        } else {
          // Create a new conversation
          onConversationClick({ id: friendId });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="new-conversation-container">
      <h2>Start a new conversation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select a friend:
          <select value={selectedFriendId} onChange={handleFriendSelect}>
            <option value="">-- Please select --</option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.id}>
                {friend.username}
              </option>
            ))}
          </select>
        </label>
        <label>
          Message:
          <textarea value={messageBody} onChange={handleMessageChange}></textarea>
        </label>
        <button type="submit">Send</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewConversation;
