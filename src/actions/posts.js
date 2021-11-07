import { Typography } from '@material-ui/core';
import * as api from '../api';

export const getPosts=()=> async(dispatch)=>{
    try {
        const {data}=await api.fetchPosts();
        dispatch({type:'FETCH_ALL', payload:data});
    } catch (error) {
        console.log(error.message);
    }
    
   // const action ={type:'FETCH_ALL', payload:[]}
}
export const createPost=(post)=>async (dispatch) => {
    try {
        //console.log(post._id);
        const {data} = await api.createPosts(post);
        dispatch({type:'CREATE', payload:data});
    } catch (error) {
        console.log(error); 
    }
}
export const deletePost=(post)=>async (dispatch)=>{
    try{
        console.log(post._id);
        const {data}=await api.deletePost(post);
        console.log("{data}", {data});
        dispatch({type:'DELETE', payload:data});
    }
    catch(err){
        console.log(err);
    }
}
export const likePlus=(post, likers, likeCount)=>async (dispatch)=>{
    try{
        const {data}=await api.likePlus(post, likers, likeCount);
        dispatch({type:'LIKEPLUS', payload:data});
    }
    catch(err){
        console.log(err);
    }
}
export const updatePost=(id, updatedPost)=> async (dispatch)=>{
    try{
        const {data}=await api.updatePost(id, updatedPost);
        dispatch({type:'UPDATE', payload:data});
    }
    catch(err)
    {
        console.log(err);
    }
}

export const signIn=async (id, password, setUser, user2, setModalWarning)=>{
    try {
        //console.log("NAMANANAAN");
        await api.login(id, password)
        .then(async (data)=>{//console.log(data, data.data);
            var user=data.data;
          //  console.log(data.status);
           // console.log("NAMAN", user);
            setModalWarning(false);
           await setUser(user);
        }) 
           //    console.log(user.payload);
        //return {data:user};
    }
    catch (err) {
        console.log("Error:",err);
        setModalWarning(true);
        return null;
    }
}