import React, { Component } from 'react'
import { 
  Text, 
  View,
  TextInput,
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {


  static navigationOptions = ({navigation,refresh}) => ({
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
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }


  componentDidMount() {
    this.props.getCurrentProfile();
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company         = !isEmpty(profile.company) ? profile.company : '';
      profile.website         = !isEmpty(profile.website) ? profile.website : '';
      profile.location        = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername  = !isEmpty(profile.githubusername) ? profile.githubusername : '';
      profile.bio             = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social          = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter         = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.facebook        = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.linkedin        = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
      profile.youtube         = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.instagram       = !isEmpty(profile.social.instagram) ? profile.social.instagram  : '';

      // Set component fields state
      this.setState({
        handle          : profile.handle,
        company         : profile.company,
        website         : profile.website,
        location        : profile.location,
        status          : profile.status,
        skills          : skillsCSV,  
        githubusername  : profile.githubusername,
        bio             : profile.bio,
        twitter         : profile.twitter,
        facebook        : profile.facebook,
        linkedin        : profile.linkedin,
        youtube         : profile.youtube,
        instagram         : profile.instagram
      });
    }
  }



  // ==============================handle all submit===============================//

onHandle(handle){
  this.setState({handle})
}

onCpmpany(company){
  this.setState({company})
}
onWebsite(website){
  this.setState({website})
}

onLocation(location){
  this.setState({location})
}
onStatus(status){
  this.setState({status})
}
onSkills(skills){
  this.setState({skills})
}
onGithubusername(githubusername){
  this.setState({githubusername})
}
onBio(bio){
  this.setState({bio})
}

onTwitter(twitter){
  this.setState({twitter})
}
onFacebook(facebook){
  this.setState({facebook})
}
onLinkedin(linkedin){
  this.setState({linkedin})
}
onYoutube(youtube){
  this.setState({youtube})
}
onInstagram(instagram){
  this.setState({instagram})
}
//===================================final submit==============================//
  onSubmit() {

    const profileData = {
      handle         : this.state.handle,
      company        : this.state.company,
      website        : this.state.website,
      location       : this.state.location,
      status         : this.state.status,
      skills         : this.state.skills,
      githubusername : this.state.githubusername,
      bio            : this.state.bio,
      twitter        : this.state.twitter,
      facebook       : this.state.facebook,
      linkedin       : this.state.linkedin,
      youtube        : this.state.youtube,
      instagram      : this.state.instagram
    };

    this.props.createProfile(profileData);
  }


  render() {

    const { errors, displaySocialInputs } = this.state;


    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <View>
          <View>
            <TextInput
                placeholder="Twitter Profile URL"
                value={this.state.twitter}
                onChangeText={this.onTwitter.bind(this)}
                style={styles.textInput}
            />
            {errors && (<Text style={{color:"red"}}>{errors.twitter}</Text>)}
          </View>

          <View>
            <TextInput
            placeholder="Facebook Page URL"
            value={this.state.facebook}
            onChangeText={this.onFacebook.bind(this)}
            style={styles.textInput}
            />
            {errors && (<Text style={{color:"red"}}>{errors.facebook}</Text>)}
          </View>

          <View>
            <TextInput
            placeholder="Linkedin Profile URL"
            value={this.state.linkedin}
            onChangeText={this.onLinkedin.bind(this)}
            style={styles.textInput}
            />
            {errors && (<Text style={{color:"red"}}>{errors.linkedin}</Text>)}
          </View>

          <View>
            <TextInput
            placeholder="YouTube Channel URL"
            value={this.state.youtube}
            onChangeText={this.onYoutube.bind(this)}
            style={styles.textInput}
            />
            {errors && (<Text style={{color:"red"}}>{errors.youtube}</Text>)}
          </View>

          <View>
            <TextInput
            placeholder="Instagram Page URL"
            value={this.state.instagram}
            onChangeText={this.onInstagram.bind(this)}
            style={styles.textInput}
            />
            {errors && (<Text style={{color:"red"}}>{errors.instagram}</Text>)}
          </View>
        </View>
      );
    }


    return (
     
        <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <View>
              <TextInput style={styles.textInput} 
                placeholder="Profile Handle"
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.handle}
                onChangeText={this.onHandle.bind(this)}
              />
                {errors && (<Text style={{color:"red"}}>{errors.handle}</Text>)}
            </View>
            <View>
            <Picker
              style={{flex:1}}
              selectedValue={this.state.status}
              onValueChange={this.onStatus.bind(this)}
              style={{width:340,
                      marginTop: 10,
                      height:50,
                      paddingLeft: 10,
                      }}
            >
              <Picker.Item label= '* Select Professional Status' value= "0"  />
              <Picker.Item label="Developer" value="Developer" />
              <Picker.Item label="Junior Develope" value="Junior Develope" />
              <Picker.Item label="Senior Developer" value="Senior Developer" />
              <Picker.Item label="Manager" value="Manager" />
              <Picker.Item label="Student or Learning" value="Student or Learning" />
              <Picker.Item label="Instructor or Teacher" value="Instructor or Teache" />
              <Picker.Item label="Intern" value="Intern" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
              {/* <TextInput style={styles.textInput} 
                placeholder="Status"
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.status}
                onChangeText={this.onStatus.bind(this)}
              /> */}
                {errors && (<Text style={{color:"red"}}>{errors.status}</Text>)}
            </View>
            <View>
              <TextInput style={styles.textInput} 
                placeholder="Company"
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.company}
                onChangeText={this.onCpmpany.bind(this)}
              />
                {errors && (<Text style={{color:"red"}}>{errors.company}</Text>)}
            </View>
            <View>
              <TextInput style={styles.textInput} 
                placeholder="Website"
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.website}
                onChangeText={this.onWebsite.bind(this)}
              />
                {errors && (<Text style={{color:"red"}}>{errors.website}</Text>)}
            </View>
            <View>
              <TextInput style={styles.textInput} 
                placeholder="Location"
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.location}
                onChangeText={this.onLocation.bind(this)}
              />
                {errors && (<Text style={{color:"red"}}>{errors.location}</Text>)}
            </View>
            <View>
              <TextInput style={styles.textInput} 
                placeholder="Skills (please use comma for new skills)"
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.skills}
                onChangeText={this.onSkills.bind(this)}
              />
                {errors && (<Text style={{color:"red"}}>{errors.skills}</Text>)}
            </View>
            <View>
              <TextInput style={styles.textInput} 
                placeholder="Github Username"
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.githubusername}
                onChangeText={this.onGithubusername.bind(this)}
              />
                {errors && (<Text style={{color:"red"}}>{errors.githubusername}</Text>)}
            </View>
            <View>
              <TextInput style={styles.textInput} 
                placeholder="Short Bio"
                multiline={true}
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.bio}
                onChangeText={this.onBio.bind(this)}
              />
                {errors && (<Text style={{color:"red"}}>{errors.bio}</Text>)}
            </View>
            <View>
              <TouchableOpacity
              style={styles.optionalLink}
                onPress={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
              >
                <Text style={styles.Links}>Add Social Network Links (Optional) </Text>
              </TouchableOpacity>
              {socialInputs}
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onSubmit.bind(this)}>
              <Text style={styles.buttonText}>
                  Submit 
              </Text>    
            </TouchableOpacity>
            
          </ScrollView>
        </View>
        </KeyboardAvoidingView>
      
    )
  }
}



EditProfile.propTypes = {
  createProfile:PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired,
  errors  : PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
  profile:state.profile,
  errors:state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);


const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    alignItems: 'center',
},
scrollViewWrapper: {
    marginTop: 10,
    flex: 1
},
scrollView: {
    paddingTop: 20,
    flex: 1
},
  textInput:{
    width:340,
      marginTop: 10,
      fontSize:15,
      height:50,
      backgroundColor:'white',
      borderRadius:10,
      paddingLeft: 10,
  },
  optionalLink:{
    width:340,
    marginTop: 10,
    backgroundColor:'white',
    borderRadius:10,
    paddingLeft: 10,
    height:40,
  },
  Links:{
    marginTop: 10,
    fontSize:15,
    color:"red"
  },
  button:{
    width:100,
    backgroundColor: "green",
    marginVertical: 20,
    borderRadius: 10,
    height:50,
    justifyContent:"center",
    marginLeft:"33%",
  },
  buttonText:{
      fontSize:16,
      fontWeight:"500",
      textAlign:"center",
      color:"white"
      
  },
})
