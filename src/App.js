import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid, Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import memories from './images/memories.png';
import { deletePost, getPosts } from './actions/posts.js';
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import useStyles from './styles';
import Modal from './components/Modal/Modal'
import './index.css';
const App =()=>{
  // eslint-disable
  const [currentId, setCurrentId]=useState(null);
  const [userId, setUser]=useState(null);
    const classes = useStyles();
    
    const[modalOpen, setModalOpen]=useState(false);
    
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    }, [dispatch]);
    var notificNumber=0;
    function NotificationPush(str)
    {
      //  console.log("CALL");
        
            const el=document.createElement("div");
            const tempstr=`<div class="alertNotificEl">Alert!</div><div class="textNotificEl">${str}</div>`;
            el.innerHTML=tempstr;
            el.className="notificEl";
            const closeBtn=(document.createElement("Button"));
            closeBtn.className="closeBtnNP MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-buttonSubmit-16 ";
            closeBtn.innerHTML="✖";
            closeBtn.onclick=()=>el.classList.add("hideEl");
            el.append(closeBtn);
        const notificP=document.getElementById("notificP");
        notificP.append(el);
        notificNumber++;
        setTimeout(()=>el.classList.add("hideEl2"), 2500);
        setTimeout(()=>{el.classList.add("hideEl");notificNumber--;}, 3500);

    }
    
    /* <Grid item xs={12} sm={4}>
    <Form/>
    </Grid>*/
    return ( 
        
        <Container maxwidth="lg">
            <div className="modalContainer">
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} setUser={setUser} user={userId}/>
            </div>
            <div className="notificP" id="notificP">
                </div>
            <AppBar className={classes.appBar} color="inherit" position="static">
                <Typography className={classes.heading} variant="h2" align="center">Graffiti Wall</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
                <a className="sideTitle"  href="https://github.com/namangoswami">By Naman</a>
                <Button className="logIn" onClick={()=>{setModalOpen(true)}}>{userId?"Log Out":"Login/Sign Up"}</Button>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Posts currentId={currentId} setCurrentId={setCurrentId} userId={userId}setUser={setUser} notificPush={NotificationPush}/>
                        </Grid>
                       
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}
export default App;