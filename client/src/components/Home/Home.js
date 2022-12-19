import React from 'react'
import { Container , Grid , Grow } from '@material-ui/core';
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from '../../styles';
const Home = () => {
    const classes = useStyles();
  return (
    <Grow in>
        <Container>
            <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts/>
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form/>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home