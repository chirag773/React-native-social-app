import axios from "axios";

import { Actions } from 'react-native-router-flux';
import {
  GET_PROFILE, 
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES,
} from "./types.js";

//get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get("http://192.168.0.101:5000/api/profile")
    .then(res => 
      dispatch({
        type:GET_PROFILE,
        payload:res.data
      })
    )
    .catch(err => 
      dispatch({
        type:GET_PROFILE,
        payload:{}
      })  
    )
}

//create profile

export const createProfile = (profileData) => dispatch => {
  axios.post("http://192.168.0.101:5000/api/profile",profileData)
    .then(res => Actions.DashBoard())
    .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    )
}


// create experience 

export const addExperience = (expData) => dispatch => {
  axios.post("http://192.168.0.101:5000/api/profile/experience",expData)
    .then(res => Actions.DashBoard())
    .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    )
}


// add education

export const addEducation = (eduData, history) => dispatch => {
  axios.post("http://192.168.0.101:5000/api/profile/education",eduData)
    .then(res => Actions.DashBoard())
    .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    )
}


// delete experience

export const deleteExperience = (id) => dispatch => {
  axios.delete(`http://192.168.0.101:5000/api/profile/experience/${id}`)
    .then(res => dispatch({
      type:GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    )
}


// delete education

export const deleteEducation = (id) => dispatch => {
  axios.delete(`http://192.168.0.101:5000/api/profile/education/${id}`)
    .then(res => dispatch({
      type:GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    )
}

//get all profile
export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get("http://192.168.0.101:5000/api/profile/All")
    .then(res => 
      dispatch({
        type:GET_PROFILES,
        payload:res.data
      })
    )
    .catch(err => 
      dispatch({
        type:GET_PROFILES,
        payload:null
      })  
    )
}


//get profile by handle 

export const getProfileHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`http://192.168.0.101:5000/api/profile/handle/${handle}`)
    .then(res => 
      dispatch({
        type:GET_PROFILE,
        payload:res.data
      })
    )
    .catch(err => 
      dispatch({
        type:GET_PROFILE,
        payload:null
      })  
    )
}



//delete Profile or account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This action can not be undone!")) {
    axios.delete("http://192.168.0.101:5000/api/profile")
      .then(res => 
        dispatch({
          type:SET_CURRENT_USER,
          payload:{}
        })  
      )
      .catch(err => 
        dispatch({
          type:GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}

// Add followers
export const followUser = id => dispatch => {
  axios
    .post(`http://192.168.0.101:5000/api/users/user/${id}/follow-user`)
    .then(res => dispatch(getProfile()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Add followers
export const unfollowUser = id => dispatch => {
  axios
    .post(`http://192.168.0.101:5000/api/users/user/${id}/unfollow-user`)
    .then(res => dispatch(getProfile()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//loading profile
export const setProfileLoading = () => {
  return{
    type:PROFILE_LOADING
  }
}




//clear profile
export const clearCurrentProfile = () => {
  return{
    type:CLEAR_CURRENT_PROFILE
  }
}

