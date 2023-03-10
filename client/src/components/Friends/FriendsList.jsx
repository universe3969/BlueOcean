import React, {useEffect, useState} from 'react';


const FriendsList = () => {
  const [friendsList, setFriendsList] = useState([]);
  const user = {id: 2};

  useEffect(() => {
    // Use API to get the list of friends for the current user
    const fetchData = async () => {
      const response = await fetch(`/api/friends/${user.id}`);
      const data = await response.json();
      setFriendsList(data);
    };
    fetchData();
  }, [user.id]);

  return (
    <main>
      <h1>My Friends</h1>
      <ul className="friends-list">
        {friendsList.map((friend) => (
          <li key={friend.id} className="friend-item">
            <img className="friends-page-avatar" src={friend.avatar} alt={friend.name} />
            <div className="friend-details">
              <h2>{friend.name}</h2>
              <p>{friend.age} years old</p>
              <p>{friend.gender}</p>
              <p>Interests: {friend.interests.join(', ')}</p>
            </div>
            <Link to={`/messages/${friend.id}`} className="message-button">Message</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default FriendsList;