import React, { Component } from 'react'
import { 
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid
 } from 'react-native'
import { Actions } from 'react-native-router-flux';

class ProfileActions extends Component {

  onCreateProfile(){
    Actions.editProfile()
  }
  onCreateExperience(){
    Actions.addExperience()
  }

  onCreateEducation(){
    Actions.addEducation()
  }

  render() {
    return (
      <View style={styles.profileaction}>
        <TouchableOpacity 
          onPress={this.onCreateProfile}
          style={styles.profileButton}
          >
          <Text style={styles.profileButtonText}>  Edit Profile  </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={this.onCreateExperience}
          style={styles.profileButton}
        >
          <Text style={styles.profileButtonText}>  Add Experience  </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={this.onCreateEducation}
          style={styles.profileButton}
          >
          <Text style={styles.profileButtonText}>  Add Education  </Text>
        </TouchableOpacity>
      </View>
    )
  }
}


export default ProfileActions

const styles = StyleSheet.create({
  profileaction:{
    flexWrap: 'wrap', 
    flexDirection:'row',
    justifyContent:"space-around",
  },
  profileButton:{
    backgroundColor: "green",
    marginVertical: 10,
    borderRadius: 10,
    height:40,
    justifyContent:"center",
  },
  profileButtonText:{
    fontSize:16,
    fontWeight:"500",
    textAlign:"center",
    color:"white"
  }
})