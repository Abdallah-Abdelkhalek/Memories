import React,{useEffect} from 'react'
import {AppBar , Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import useStyles from './styles';
import {Link} from 'react-router-dom';
import memories from '../../images/memories.png';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {actions} from '../../reducers/authSlice'
function Navbar() {
    const classes = useStyles();
    let user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(user))
    }, [user]);
    const handleLogout = () =>{
        localStorage.clear();
        user = null;
        dispatch(actions.logout());
    }
    
    const history = useHistory();
    
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        
        <div className={classes.brandContainer} onClick={e => history.push('/')}>
            <Typography className={classes.heading} variant="h2" align="center"> Memories </Typography>
            <img  className={classes.image} src={memories} alt="memories" height="60"/>
        </div>
    
        <Toolbar className={classes.toolbar}>
        {user? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant='h6'>{user.name}</Typography>
                <Button variant='contained' className={classes.logout} color="secondary" onClick={handleLogout}>Log Out</Button>
            </div>
        ):(
            <Button component={Link} to='/Auth' variant='contained' color='primary'>Sign in</Button>
        )}
        
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
