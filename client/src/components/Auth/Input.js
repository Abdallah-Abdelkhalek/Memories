import {  Grid , TextField, InputAdornment, IconButton } from '@material-ui/core'
import React from 'react'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({half , name , label , handleChange , autoFocus ,type ,handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half? 6 : 12}>
        <TextField 
            name={name} 
            label={label} 
            onChange={handleChange} 
            variant="outlined"
            autoFocus={autoFocus}
            required
            type={type}
            InputProps={name === 'password' ?{
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ?<Visibility/> :<VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }:null}
            xs={6}/>
    </Grid>
  )
}

export default Input