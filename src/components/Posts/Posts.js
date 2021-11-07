
import React from 'react';
import { useSelector } from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core';
import Post from './Post/Post.js'
import useStyles from './styles'
import Form from '../Form/Form';
import Modal from '../Modal/Modal'
const Posts =({currentId, setCurrentId, userId, setUser, notificPush })=>{
    const posts=useSelector((state)=>state.posts);
   // console.log(posts);
    const classes = useStyles();
    return(
        (
            <Grid className={classes.container} container alignItems="flex-start" spacing={3}>
                <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} userId={userId} /></Grid>
                {posts.map((post)=>(
                    !posts.length?<CircularProgress className="circular Progress"/>:(<Grid key={post._id} item xs={12} sm={4} >
                        <Post currentId={currentId} setCurrentId={setCurrentId} userId={userId} post={post} notificPush={notificPush}/>
                    </Grid>)
                ))}
            </Grid>
        )
    )
}
export  default Posts;