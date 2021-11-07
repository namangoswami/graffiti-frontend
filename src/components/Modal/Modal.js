import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {createPost, updatePost, signIn} from '../../actions/posts'
import axios from 'axios'
import './modal.css'

const Modal =({modalOpen, setModalOpen,setUser, user})=>{
    const [userData, setUserData]=useState({
        user:'',
        password:''
    });
    const [modalWarning, setModalWarning]=useState(null);
     
   const classes = useStyles();
    const dispatch=useDispatch();
   const handleSubmit=async (e)=>{
    e.preventDefault();
    await signIn(userData.user, userData.password, setUser, user, setModalWarning)
    .then(()=>console.log("Login attempt"));
    
  //  console.log(signIn(userData.user, userData.password, setUser, user));
     //console.log("USER2", user2);
     //setUser(user2);
  //  console.log("USER1",user);

    }
    const logOut=async(e)=>{
        setUser(null);
        setUserData({user:'',password:''})
    }
    useEffect(()=>{
        //console.log(user);
    if(user)
    setModalOpen(false)
    }, [user])
    return(
        
       !modalOpen?<></>:<div className="modalContainer2">
        <Paper className="Modal">
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} id="modalForm" onSubmit={handleSubmit}>
                <Typography variant="h6">
                    Login/Sign up
                </Typography>
                <Typography class="subTitle" variant="">
                    For new User Names, new account is created automatically
                </Typography>
                {modalWarning?<Typography className="wrongPass" variant="">
                    Wrong Password!
                </Typography>:<></>}
                <Button className="closeBtn" onClick={()=>{setModalWarning(false);setModalOpen(false)}}>✖</Button>
                <TextField name="user" variant="outlined" label="User Name" fullWidth value={userData.user} onChange={(e)=> setUserData({... userData, user:e.target.value})}/>
                <TextField name="password" variant="outlined" label="Password" type="password"fullWidth value={userData.password} onChange={(e)=> setUserData({... userData, password:e.target.value})}/>
                
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Log In</Button>
            { user?<Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" onClick={logOut} fullWidth>Log Out</Button>
            :<></>}
            </form>
        </Paper>
        </div>
    )
}
export  default Modal;