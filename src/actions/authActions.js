import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import SharedPreferences from 'react-native-shared-preferences';
import {AsyncStorage} from "react-native";
import {Actions} from "react-native-router-flux";

import { 
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

//register user
export const registeruser = (newUser) => dispatch => {
  
    axios.post("http://your_ip/api/users/register", newUser)
       .then(res => {
        console.log(newUser)
        Actions.login()
       })
       .catch(err => dispatch({
         type:GET_ERRORS,
         payload: err.response.data
       })
       )
  }


  //Login user with token


  export const loginuser = userData => dispatch => {

    axios.post("http://your_ip/api/users/login", userData)
      .then(res => {

        // save user token to local storage 
        const { token } = res.data;
        
        AsyncStorage.setItem("jwtToken", token);
        console.log(AsyncStorage.setItem())
    
        // set token to auth header i.e authorization 
        setAuthToken(token);

        // decode the token and saveuser to deoded

        const decoded = jwt_decode(token);
        console.log(token)
        //set current user 
        
        console.log(decoded)
        dispatch(setCurrentUser(decoded));

        Actions.main()

      })
      .catch(err => dispatch({
        type:GET_ERRORS,
        payload: err.response.data
      })
      )
  }

  //set lgged in user

  export const setCurrentUser = (decoded) => {
    return {
      type:SET_CURRENT_USER,
      payload:decoded
    }
  }

  //logout user

  export const logoutuser = () => dispatch => {

    // remove token from local storage
    AsyncStorage.removeItem("jwtToken");
    //remove auth header for duture authorization
    setAuthToken(false);
    //set current User to empty oject so isAuthentication wll become false
    dispatch(setCurrentUser({}));

    Actions.login()
  }
