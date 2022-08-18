import React from 'react';
import './post.scss';

// this is a *functional* component (not a class component) because it's not stateful

const Post = ({ name, description, date, quantity, imageurl, id, claimItem }) => {
  return (
    <div className="Post">
      <p>
        <strong>Name: </strong> {name}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
      <p>
        <strong>Date offered: </strong> {date.slice(0,10)}
      </p>
      <p>
        <strong>Quantity: </strong> {quantity}
      </p>
      <p>
        <strong>Picture: </strong> <img src={imageurl} />
      </p>
      <button className="ClaimButton" onClick={() => claimItem(id)}>Claim item!</button>
    </div>
  )
};




export default Post;