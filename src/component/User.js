import React, { Component } from 'react'
import { 
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
  RefreshControl,
  ScrollView
 } from 'react-native';
 import PropTypes from "prop-types";
 import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { getCurrentProfile } from "../actions/profileActions";
import { logoutuser } from "../actions/authActions";

class User extends Component {
  
  onLogoutClick(){
    this.props.logoutuser()
    
  ToastAndroid.show('Successfully Logout..!!', ToastAndroid.SHORT);
}

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    
    return (
      <View style={styles.container}>
        <View style={styles.logoutview}>
                      <TouchableOpacity 
                        style={styles.button} 
                        onPress={this.onLogoutClick.bind(this)} 
                        activeOpacity={0.7}
                      >
                        <Text style={styles.buttonText}>Logout</Text>
                      </TouchableOpacity>
                    </View>
      </View>
    )
  }
}



User.propTypes = {
  getCurrentProfile:PropTypes.func.isRequired,
  logoutuser : PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired

}

const mapSateToProps = state => ({
  profile:state.profile,
  auth:state.auth
})

export default connect(mapSateToProps, 
  { 
    getCurrentProfile,
    logoutuser
  })(User);


  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',  
      
    },
  button:{
    width:340,
    backgroundColor: "red",
    marginVertical: 10,
    paddingVertical: 16,
    borderRadius: 30,
  },
  buttonText:{
    fontSize:16,
    fontWeight:"500",
    textAlign:"center",
    color:"white"
      
  },
  })