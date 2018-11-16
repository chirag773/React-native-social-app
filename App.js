import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./src/utils/setAuthToken";
import store from "./src/store";
import Routers from "./src/Routers";
import { setCurrentUser,logoutuser } from "./src/actions/authActions";
import { AsyncStorage } from "react-native"
import { Actions } from 'react-native-router-flux';


// check token 

if(AsyncStorage.jwtToken){
  //set auth token header auth 
  setAuthToken(AsyncStorage.jwtToken);
  // decode token and get user and experire
  const decoded = jwt_decode(AsyncStorage.jwtToken);

  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); 

  //check for expire token 
  const currentTime = Date.now() / 1000;

  
  if(decoded.exp < currentTime){
    //logged user back
    store.dispatch(logoutuser());

    //clear current user
    // store.dispatch(clearCurrentProfile());
    
    // redirect user to /login
    // window.locaton.href = "/login"
    Actions.login()
  }
}


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routers/>
      </Provider>
    );
  }
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
