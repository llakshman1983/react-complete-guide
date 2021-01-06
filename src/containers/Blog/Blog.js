import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import classes from './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        // Axios uses promises
        // Asyc call - 
        // https://jsonplaceholder.typicode.com/
       const blogPosts = axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 5);
                const updatedPosts = posts.map(p => {
                    return {
                        ...p, 
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // this.setState({posts: response.data});
                //console.log(response);
       }).catch(error => {
           console.log(error);
           this.setState({error: true});
       });
    }

    postSelectHander = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <b style={{textAlign: 'center'}, {color: 'red'}}>Something Went Wrong</b>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.key} 
                    title={post.title}
                    author={post.author} 
                    clicked={() => this.postSelectHander(post.id)}/>
                }
            );
        }
        
        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;