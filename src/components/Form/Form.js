import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {createPost, updatePost} from '../../actions/posts'
import axios from 'axios'

const Form =({currentId, setCurrentId, userId})=>{
    const tempCreator=(userId)?userId:'';
    const [postData, setPostData]=useState({
        creator:'', 
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    });
    
    const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null);
    const classes = useStyles();
    const dispatch=useDispatch();
    const handleSubmit=(e)=>{
        console.log("SUBMIT");
        e.preventDefault();
        if(currentId)
        {   
            console.log("POST ID:", currentId);
            dispatch(updatePost(currentId, postData))
        }
        else
        dispatch(createPost(postData));
    }
    const clear =()=>{
        setCurrentId(null);
        if(userId){
            console.log("Trying to clear!")
        setPostData({
            creator:userId,   
        title:'',
        message:'',
        tags:'',
        selectedFile:''});}
        else{
            setPostData( {  creator:'', 
                title:'',
                message:'',
                tags:'',
                selectedFile:''});
        }
    }
    useEffect(()=>{
        if(post)
        {   

            setPostData(post)}
            else if(userId)
            {
              
        setPostData({...postData, creator:userId})
            }
            else if(userId==null)
            {
                
        setPostData({...postData, creator:''})
            }
    }, [post, userId])
    return(
        <Paper className={classes.Paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} id="mainForm" onSubmit={handleSubmit}>
                <Typography variant="h6">
                    Write Something
                </Typography>
                <TextField name="creator" variant="outlined" label="Creator"  disabled={(userId)?true:false}   fullWidth value={postData.creator} onChange={(e)=> {console.log("VALUE: ",e.value);setPostData({... postData, creator:e.target.value})}}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=> setPostData({... postData, title:e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=> setPostData({... postData, message:e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=> setPostData({... postData, tags:e.target.value})}/>
                <div className={classes.fileInput} required>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64})=>setPostData({...postData, selectedFile: base64})}
                        id="fileBase"
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}
export  default Form;