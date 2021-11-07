import React, {useEffect} from 'react';
import useStyles from './styles'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {deletePost, likePlus} from '../../../actions/posts';
import {useDispatch} from 'react-redux'
import liked from '../../../App'

const Post =({currentId, setCurrentId, post, userId, notificPush})=>{
    const classes = useStyles();
    const dispatch=useDispatch();
    var liked=false;
    var likeChange=false;
    function handleDelete(e){
     
        if(userId==post.creator||userId=='adminNaman2002')
        dispatch(deletePost(post));
        else{
            console.log("Not your Id");
        }
    }
    
    function handleLike(e){
        //console.log("Naman", post._id);
      //  console.log(userId);
      //  console.log("LIKERS: ",post.likers);
       if(!userId)
       {
        notificPush("You are Not Logged in!");
        }
       else{
        if(post.likers.includes(userId))
        {
            //post.likers.remove(userId);
            var tempAr=[], i;
            for(i of post.likers)
            {
                if(i!=userId)
                {
                    tempAr.push(i);
                }
            }
            post.likers=tempAr;
            post.likeCount--;
            //console.log(post.likers, post.likeCount);
           
        }
        else
        {
            post.likers.push(userId);
            post.likeCount++;
           // console.log(post.likers, post.likeCount);
            
           
        }

           dispatch(likePlus(post, post.likers, post.likeCount));
       }
        //console.log("Liked:", liked);
    }
   
    var likedByUser=false;
    useEffect(()=>{
      //  console.log("Post Likers: ", post.likers)
        
        
     //   console.log("Called use effect on post")
}, [post])
    return(
        <Card className={classes.card}>
            {!post.selectedFile?<></>:<CardMedia className={classes.media} image={post.selectedFile} title={post.title} id="media"/>}
            <div className={classes.overlay}>
                <Typography variant="h6" >{post.creator}</Typography>
                <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={()=>{
                    if(userId===post.creator)
                    {window.scrollTo(0, 0); setCurrentId(post._id);}
                    else
                    notificPush("You can only edit your own Post!");
                    }}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="Body2" color="textSecondary" >{post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <Typography className={classes.title} variant="h6" gutterBottom >{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color={post.likers.includes(userId)?"primary":"grey"} onClick={handleLike}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Like  {post.likeCount}
                </Button>
                <Button size="small" color="primary" disabled={(post.creator!=userId&&userId!='adminNaman2002')?true:false} onClick={handleDelete}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
    
}
export  default Post;