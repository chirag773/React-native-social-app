import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Scene, Router, Actions, Stack, Tabs} from "react-native-router-flux";
import LoginForm from "./component/form/LoginForm";
import SignupForm from "./component/form/SignupForm";
import DashBoard from "./component/Dashboard/DashBoard";
import EditProfile from './component/edit-profile/EditProfile';
import CreateProfile from './component/create-profile/CreateProfile';
import AddExperience from './component/add-credentials/AddExperience';
import AddEducation from './component/add-credentials/AddEducation';
import Profiles from './component/profiles/Profiles';
import Posts from './component/posts/Posts';
import Icon from "react-native-vector-icons/FontAwesome"
import Profile from './component/Profile/Profile';
import UserProfile from './component/user/UserProfile';
import Post from './component/post/Post';


const TabIcon = ({ focused, iconName}) => {

  var color = focused ? "black" : "grey"
  return (
    <Icon name={iconName} size={24} color={color}/>
  )
}

class RouterComponent extends Component {
  
  render() {
    return (
      <Router>
          <Stack key="root" >


            <Scene key="login" component={LoginForm} title="Log In"  initial={true}/>
            <Scene key="signup" component={SignupForm} title="SignUp"/>
            
            {/* left={()=>null} is use to disable back button */}
            {/* <Scene 
            key="home" 
            component={Home} 
            title="Home" 
            left={()=>null}
            rightTitle="Add"
            />  */}
            
            <Tabs 
              hideNavBar={true} 
              showLabel={false} 
            >
              <Scene key="main" title="DashBoard" icon={TabIcon} iconName="home">
                <Scene key="DashBoard" component={DashBoard} title="DashBoard"  initial/> 
                {/* <Scene key="editProfile" component={EditProfile} title="Edit Profile"/> */}
                <Scene key="createProfile" component={CreateProfile} title="Create Profile"/>
                {/* <Scene key="addExperience" component={AddExperience} title="Add Experience"/>
                <Scene key="addEducation" component={AddEducation} title="Add Education"/> */}
              </Scene>
              
              <Scene key="Developer" icon={TabIcon} iconName="users">
                <Scene key="Profiles" component={Profiles} title="Profiles" initial/>
                <Scene key="profile" component={Profile} title="Profile"/>
                <Scene key="editProfile" component={EditProfile} title="Edit Profile"/> 
              </Scene>
              
              <Scene key="Posts"  icon={TabIcon} iconName="edit">
                <Scene component={Posts} title="Posts"/>
                <Scene key="comment" component={Post} title="Comment"/>
              </Scene>
              
              
              <Scene key="myprofile"  icon={TabIcon} iconName="user">
                <Scene component={UserProfile} title="My Profile"/>
                <Scene key="addExperience" component={AddExperience} title="Add Experience"/>
                <Scene key="addEducation" component={AddEducation} title="Add Education"/>
                <Scene key="editProfile" component={EditProfile} title="Edit Profile"/> 
              </Scene>
             
            </Tabs>
            
              

          </Stack>
          
      </Router>
    );
  }
}

export default RouterComponent;
