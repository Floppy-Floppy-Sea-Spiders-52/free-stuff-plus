import React, { Component } from 'react';
import Post from './Post'; // this should work without .jsx file ending, based on the "resolve" property in the module.exports object in webpack.config.js.
import './posts-container.scss'

// this is a *class* component (not a functional component) because it's stateful

class PostsContainer extends Component {
    constructor(props) {
        super();
        // this.state = {
        //     postObjsArr: [], // this will be updated by queries to the database
        // };
        // remember to bind any methods to _this_ here
    };
    // moved this call to app component
    // componentDidMount() {

    //     // make an API call to backend, parse the JSON string, and set the resulting array as the new value of this.state.postObjsArr
    //     fetch('/api')
    //         .then(res => res.json())
    //         .then(updatedPostObjsArr => {
    //             this.setState(prevState => {
    //                 return Object.assign({}, prevState, {postObjsArr: updatedPostObjsArr});
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });       
    // };

    render() {
        // const truncatedPostObjsArr = this.state.postObjsArr.slice(0,10);
        // now passing the postsArray as props from App component
        const truncatedPostObjsArr = this.props.postsArray.slice(0,10);
        let postsArr = [];
        

        // this used to be: name={post.name}

        truncatedPostObjsArr.forEach((postObj, index) => {
            postsArr.push(
                <Post name={postObj.name} description={postObj.description} date={postObj.date} quantity={postObj.quantity} imageurl={postObj.imageurl} key={index} />
            )
        });

        return (
            <div className="PostsContainer">
                Hello from the PostsContainer! The ten most recent posts are: {postsArr}
            </div>
        );
    };
};

export default PostsContainer;