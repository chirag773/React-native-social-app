import React, { Component } from 'react'
import { 
  Text, 
  View, 
  RefreshControl, 
  ScrollView , 
  FlatList,
  StyleSheet
} from 'react-native';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getProfileHandleId } from "../../actions/profileActions";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";

class Profile extends Component {


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




  componentDidMount() {
    if (this.props.id ) {
      this.props.getProfileHandleId(this.props.id)
    }
  }



  _onRefresh(){
    this.setState({refreshing:true})
    if (this.props.id) {
      this.props.getProfileHandleId(this.props.id)
    }
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 100);
  }
  


  render() {

    const { profile , loading} = this.props.profile;


    let profileContent;

    if(profile === null || loading){
      profileContent = <Spinner/>
    } else {
      profileContent = (
            <View>
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile}/>
              <ProfileCreds education={profile.education} experience={profile.experience}/>
              {/* {profile.githubusername ? ( 
                <ProfileGithub username={profile.githubusername}/>
              ) : null }   */}
            </View>
          
          
      )
    }


    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        style={styles.container}
      >
        {profileContent}
      </ScrollView>
    )
  }
}



Profile.propTypes = {
  getProfileHandleId:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired

}

const mapSateToProps = state => ({
  profile:state.profile,
})


export default connect(mapSateToProps,{getProfileHandleId})(Profile);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#000"
  }
})