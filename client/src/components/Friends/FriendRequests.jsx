import React, {useEffect, useState} from 'react';

const FriendRequests = () => {

  const [pendingRequests, setPendingRequests] = useState([]);
  const user = {id: 2};

  useEffect(() => {
    // Use API to get the list of pending friend requests for the current user
    const fetchData = async () => {
      const response = await fetch(`/api/friend-requests/${user.id}`);
      const data = await response.json();
      setPendingRequests(data);
    };
    fetchData();
  }, [user.id]);

  return (
    <main>
      <h1>Pending Friend Requests</h1>
      <ul className="pending-requests-list">
        {pendingRequests.map((request) => (
          <li key={request.id} className="friend-request-item">
            <img className="friends-page-avatar" src={request.avatar} alt={request.name} />
            <div className="request-details">
              <h2>{request.name}</h2>
              <p>{request.age} years old</p>
              <p>{request.gender}</p>
              <p>Interests: {request.interests.join(', ')}</p>
            </div>
            <div className="request-buttons">
              <button className="accept-button">Accept</button>
              <button className="decline-button">Decline</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default FriendRequests;