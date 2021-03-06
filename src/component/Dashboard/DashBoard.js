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
 } from 'react-native'
 import PropTypes from "prop-types";
 import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Experience from './Experience';
import Education from './Education';
import Spinner from "../Spinner"
import ProfileActions from './ProfileActions';
import { logoutuser } from "../../actions/authActions";
import { Actions } from 'react-native-router-flux';
import { Button } from 'native-base';



class DashBoard extends Component {


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


constructor(props) {
  super(props);
  this.state = {
    refreshing: false,
  };
}

_onRefresh(){
this.setState({refreshing:true})
this.props.getCurrentProfile()
setTimeout(() => {
  this.setState({refreshing: false});
}, 1000);
}



  componentDidMount() {
    this.props.getCurrentProfile()
  }


  onCreateProfilePress(){
    Actions.createProfile()
  }

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;

    if (profile === null || loading) {
      dashBoardContent = <Spinner/>
    } else {
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
          <View style={styles.wecomeContainer}>
            <Text style={styles.welcome}>WELCOME {user.name} </Text>

           
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            
          </View>
          )
      } else {
        dashBoardContent = (
          <View style={styles.container}> 
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
                    
        </ScrollView>
      
    )
  }
}


DashBoard.propTypes = {
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
  })(DashBoard);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',  
    
  },
  wecomeContainer:{
    marginTop:5,
  },
  welcome:{
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center",
  },
  createprofilebutton:{
    marginVertical: 20,
    height:50,
  },
  createprofilebuttontext:{
    fontSize:16,
    fontWeight:"500",
    textAlign:"center",
    color:"white"
    
  },
  noProfileView:{
    flex:1,
    justifyContent: 'center',
    alignItems:"center"
  },
  logoutview:{
    width:"100%",
    flex: 1,
    justifyContent: 'flex-end',
  },
  button:{
    backgroundColor: "red",
    marginVertical: 20,
    borderRadius: 10,
    height:50,
    alignItems:"center",
    
  },
  buttonText:{
      fontSize:16,
      fontWeight:"500",
      textAlign:"center",
      color:"white"
      
  },
})