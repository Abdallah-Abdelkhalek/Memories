import React, {useState , useEffect} from 'react'
import useStyles from './styles';
import { Paper , TextField , Button , Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { createPost } from '../../api';
import { useSelector , useDispatch} from 'react-redux';
import {updatePost} from '../../reducers/postsSlice';

const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    let editedPost = useSelector(state => state.posts.editPost);

    const [postData, setpostData] = useState({ title:'',message:'',tags:'',selectedFile:'' });

    const [formTitle, setformTitle] = useState("Creating");
    const user = JSON.parse(localStorage.getItem('user'));
    async function handleSubmit (e) { 
      e.preventDefault();
      try {
        await createPost({...postData, name: user?.name } )
        .then(console.log('Posted Created Successfully'));
        clear();
      } catch (error) {
        console.log('Error Creating post ' + error.message);
      }

    }
    const handleEdit = (e) =>{
      e.preventDefault();
      console.log(postData);
      dispatch(updatePost(postData._id,{...postData, name: user?.name }));
      setpostData({ title:'',message:'',tags:'',selectedFile:'' });
    }
    const clear = (e) =>{
      e.preventDefault();
      setpostData({title:"",message:"",tags:"",selectedFile:""});
      setformTitle("Creating");
    }
    
    useEffect(() => {
      setpostData(editedPost);
    }, [editedPost]);
    
    if(!user?.name){
      return(
        <Paper className={classes.paper}>
          <Typography variant="h6" align='center'>
            Please Sign In to create your own memories and like other's memories.
          </Typography>
        </Paper>
      )
    }

    return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{formTitle} a Memory</Typography>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=>setpostData({...postData,title:e.target.value})}/>
        <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=>setpostData({...postData,message:e.target.value})}/>
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=>setpostData({...postData,tags:e.target.value.split(',')})}/>

        
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth onClick={handleSubmit}>Submit</Button>
        
       
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth onClick={handleEdit}>Edit</Button>
        

        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>

      <div className={classes.fileInput}>
        <FileBase type='file' multiple={false} onDone={({base64}) => setpostData({...postData,selectedFile:base64})}/>
      </div>
    </Paper>
  )
}

export default Form