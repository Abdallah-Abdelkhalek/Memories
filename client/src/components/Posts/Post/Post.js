import React from 'react'
import useStyles from './styles';
import { Card , CardActions ,CardContent , CardMedia , Button , Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { actions , deletePost , likePost } from '../../../reducers/postsSlice'

const Post = ( {post} ) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    let sendPost = (post) => {
      dispatch(actions.getPost(post))
    }
    
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>

        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        
        {(user?._id === post?.creator) &&
        <div className={classes.overlay2}>
          <Button style={{color: 'white'}} size='small' onClick={()=>{sendPost(post)}}>
            <MoreHorizIcon fontSize='medium'/>
          </Button>
        </div>
        }

        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=> `#${tag} `)}</Typography>
        </div>

        <Typography className={classes.title} variant='h5' gutterBottom >{post.title}</Typography>
        <CardContent>
          <Typography  variant='body2' color='textSecondary' gutterBottom >{post.message}</Typography>
        </CardContent>


        <CardActions className={classes.cardActions}>

          <Button size='small' color="primary" onClick={()=>{dispatch(likePost(post._id))}}>
            <ThumbUpAltIcon fontSize='small' />&nbsp; Like {post.likes.length}
          </Button>
          
          {(user?._id === post?.creator) &&

          <Button size='small' color="primary" onClick={()=>{dispatch(deletePost(post._id))}}>
            <DeleteIcon fontSize='small' /> Delete
          </Button>
          }

        </CardActions>
      </Card>
  )
}

export default Post