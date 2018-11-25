import React, { Component } from 'react';
import { 
  Text,
   View, 
   FlatList,
   ScrollView,
   Image,
   StyleSheet ,
   TouchableOpacity,
   Linking,
   ImageBackground,
   ToastAndroid
  } from 'react-native';
import isEmpty from '../../validation/is-empty';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followUser, unfollowUser } from "../../actions/profileActions";
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';

class ProfileHeader extends Component {


onEditPress(){
  Actions.editProfile()
}
  
  findUserFollow(follower) {
    const { auth , profile} = this.props;
    
    if (follower.filter(follower => follower.user === auth.user.id).length > 0) {
      return (
        
          <TouchableOpacity
            onPress={this.onUnFollowClick.bind(this, profile.user._id)}
            style={styles.followedButton}
          >
            <Text style={styles.followedButtonText}>Followed</Text>
          </TouchableOpacity>
      )
    } 
      
      else {
        if(profile.user._id === auth.user.id){
          return(
            <TouchableOpacity
                style={styles.followButton}
                onPress={this.onEditPress.bind(this)}
              >
                <Text style={styles.buttonTextStyle}>Edit</Text>
            </TouchableOpacity>
          )
          
        }
          return (
            <TouchableOpacity
                onPress={this.onFollowClick.bind(this, profile.user._id)}
                style={styles.followButton}
              >
                <Text style={styles.buttonTextStyle}>Follow</Text>
            </TouchableOpacity>
          );
        }

      
    }
     

    onUnFollowClick(id){
      this.props.unfollowUser(id);
      // if (this.props.id && this.props.handle) {
      //   this.props.getProfileHandle(this.props.handle,this.props.id)
      // }
    }
    

  onFollowClick(id) {
    const {profile,auth} = this.props;
    // if (this.props.id && this.props.handle) {
    //   this.props.getProfileHandle(this.props.handle,this.props.id)
    // }
    this.props.followUser(id);
  }



  render() {
    
    const { auth, profile } = this.props;



    return (
      <View>

      
      <ImageBackground 
        style={styles.headerBackground} 
        source={require("../image/code-coding-computer-92905.jpg")}
      >

          <View style={styles.header}>

              <View style={styles.profileWrap}>
                  <Image style={styles.profilepic} source={{uri : "http:"+profile.user.avatar}} />
              </View>
              <Text style={styles.name}>{profile.user.name}</Text>
              <Text style={styles.status}>{profile.status} {isEmpty(profile.company) ? null : (
                 (
                   <Text style={styles.status}>at {profile.company}</Text>
                 )
               )}
             </Text> 
               {isEmpty(profile.location) ? null : (
                 (
                  <Text style={styles.location}>{profile.location}</Text>
                 )
               )}
              <View style={{marginTop:5}}>
                {this.findUserFollow(profile.user.followers)}
              </View>
          </View>
          <View style={styles.Link}>
            {isEmpty(profile.website) ? null : (
              <TouchableOpacity 
                onPress={()=> Linking.openURL(profile.website)}
              >
                {profile.website}
              </TouchableOpacity>
            )}
            {isEmpty(profile.social && profile.social.twitter) ? null : (
              <View style={{marginLeft:10}}>
                <Icon
                  onPress={()=> Linking.openURL(profile.social.twitter)}
                  style={{color:"white"}}
                  name="logo-twitter"
                />
              </View>
              

            )}
            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <View style={{marginLeft:10}}>
                <Icon
                  onPress={()=> Linking.openURL(profile.social.facebook)}
                  style={{color:"white"}}
                  name="logo-facebook"
                />
              </View>
              

            )}
            {isEmpty(profile.social && profile.social.linkedin) ? null : (
              <TouchableOpacity 
                onPress={()=> Linking.openURL(profile.social.linkedin)}
              >
                {profile.social.linkedin}
              </TouchableOpacity>
            )}
            {isEmpty(profile.social && profile.social.youtube) ? null : (
              <View style={{marginLeft:10}}>
                <Icon
                  onPress={()=> Linking.openURL(profile.social.youtube)}
                  style={{color:"white"}}
                  name="logo-youtube"
                />
              </View>
              

            
            )}
            {isEmpty(profile.social && profile.social.instagram) ? null : (
              <TouchableOpacity 
                onPress={()=> Linking.openURL(profile.social.instagram)}
              >
                {profile.social.instagram}
              </TouchableOpacity>
            )}
          </View> 
        </ImageBackground>

        <View style={styles.bar}>
          <View style={[styles.barItems,styles.barseperator]}>
            <Text style={styles.barTop}>{profile.user.followers.length}</Text>
            <Text style={styles.barBottom}>Followers</Text>
          </View>
          <View style={styles.barItems}>
            <Text style={styles.barTop}>{profile.user.following.length}</Text>
            <Text style={styles.barBottom}>Following</Text>
          </View>
        </View>
        
       </View>

     
       
        
    )
  }
}



ProfileHeader.propTypes = {
  unfollowUser:PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { followUser,unfollowUser })(
  ProfileHeader
);

const styles = StyleSheet.create({

  headerBackground:{
    flex:1,
    width:null,
    alignSelf:"stretch"
  },
  header:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    padding:20,
    backgroundColor:"rgba(0,0,0,0.5)",
  },
  Link:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.5)",
  },
  profileWrap:{
    width:160,
    height:160,
    borderRadius:100,
    borderColor:"rgba(0,0,0,0.4)",
    borderWidth:16,

  },
  profilepic:{
    flex:1,
    width:null,
    alignSelf:"stretch",
    borderRadius:100,
    borderColor:"#fff",
    borderWidth:4
  },
  name:{
    marginTop:20,
    fontSize:16,
    color:"#ffff",
    fontWeight:"bold"
  },
  status:{
    fontSize:14,
    color:"#0394c0",
    fontWeight:"300",
    fontStyle:"italic"
  },
  location:{
    fontSize:16,
    color:"#ffff",
    fontWeight:"bold"
  },
  bar:{
    borderTopColor:"#fff",
    borderTopWidth:4,
    backgroundColor:"#ec2e4a",
    flexDirection:"row"
  },
  barseperator:{
    borderRightWidth:4,

  },
  barItems:{
    flex:1,
    padding:15,
    alignItems:"center"
  },
  barTop:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold",
    fontStyle:"italic"
  },
  barBottom:{
    color:'#000',
    fontSize:14,
    fontWeight:"bold"
  },
  followedButton:{
    borderWidth:2,
    borderColor:"green",
    width:200,
    height:50,
    paddingLeft:40,
    paddingRight:40,
    alignItems:"center"
  },
  followButton:{
    borderWidth:2,
    borderColor:"white",
    width:200,
    height:50,
    paddingLeft:40,
    paddingRight:40,
    alignItems:"center"
  },
  buttonTextStyle:{
    color:"white",
    fontSize:20,
    padding:7,
  },
  followedButtonText:{
    color:"green",
    fontSize:20,
    padding:7,
  }
});