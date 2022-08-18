import React from 'react';
import Post from './Post'; // this should work without .jsx file ending, based on the "resolve" property in the module.exports object in webpack.config.js.
import './posts-container.scss'

// converting to functional component for consistency

const PostsContainer = ({ postsArray, incrementClaimedCount }) => {
  
  const claimItem = async (id) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: id })
    };
    try {
      const response = await fetch('/api/update-item', options);
      if (response.status !== 200) {
        throw Error();
      }
      incrementClaimedCount();
    } catch (err) {
      console.log('Updating item status failed: ', err);
    }
  };

  // const truncatedPostObjsArr = postsArray.slice(0,10);
  const truncatedPostObjsArr = postsArray.slice();
  let componentsArr = [];
  
  truncatedPostObjsArr.forEach((postObj) => {
    componentsArr.push(
      <Post 
        name={postObj.name} 
        description={postObj.description} 
        date={postObj.date} 
        quantity={postObj.quantity} 
        imageurl={postObj.imageurl} 
        key={postObj._id}
        id={postObj._id}
        claimItem={claimItem}
      />
    )
  });
  return (
    <div className="PostsContainer">
      {componentsArr}
    </div>
  );
};

export default PostsContainer;