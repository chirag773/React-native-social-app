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
import { getCurrentProfile } from "../../actions/profileActions";
import { logoutuser } from "../../actions/authActions";
import UserActions from './UserActions';
import Spinner from "../Spinner";
import { Button } from 'native-base';

class UserProfile extends Component {

  
  static navigationOptions = () => ({
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: 'rgb(44, 111, 148)',
      borderBottomColor: '#ffffff',
      borderBottomWidth: 3,
      
    },
    headerTitleStyle: {
      fontSize: 18,
    },
    
});

onCreateProfilePress(){
  Actions.createProfile()
}

constructor(props) {
  super(props);
  this.state = {
    refreshing: false,
  };
}

  
  onLogoutClick(){
    this.props.logoutuser()
    
  ToastAndroid.show('Successfully Logout..!!', ToastAndroid.SHORT);
}

_onRefresh(){
  this.setState({refreshing:true})
  this.props.getCurrentProfile()
  setTimeout(() => {
    this.setState({refreshing: false});
  }, 1000);
  }
  

  render() {

    const { auth } = this.props;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;

    if (profile === null || loading) {
      dashBoardContent = <Spinner/>
    } else {
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
            <UserActions auth={user} profile={profile}/>
          )
      } else {
        dashBoardContent = (
          <View style={styles.noProfileView}> 
            <Text >WELCOME {user.name} </Text>
            <Text>You have not setup your profile </Text>
            <Button 
              block 
              success
              onPress={this.onCreateProfilePress}
              style={styles.createprofilebutton}
              >
              <Text >Create Profile</Text>
            </Button>
          </View>
        )
      }
    }

    
    return (
      <ScrollView
        refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
      >
      {dashBoardContent}
        <View style={styles.logoutview}>
                      <TouchableOpacity 
                        style={styles.button} 
                        onPress={this.onLogoutClick.bind(this)} 
                        activeOpacity={0.7}
                      >
                        <Text style={styles.buttonText}>Logout</Text>
                      </TouchableOpacity>
                    </View>
      </ScrollView>
    )
  }
}



UserProfile.propTypes = {
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
  })(UserProfile);


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