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
import { Button } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

class UserActions extends Component {

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
            <Button 
              bordered 
              onPress={this.onCreateProfile}
              success
              style={styles.profileButton}
            >
              <Icons name="account-edit"  size={20} style={{paddingLeft:5}}/>
              <Text style={styles.profileButtonText}>  Edit Profile  </Text>
            </Button>

            <Button 
              bordered 
              onPress={this.onCreateExperience}
              success
              style={styles.profileButton}
            >
                <MaterialIcon name="work" size={20} style={{paddingLeft:5}}/>
                <Text style={styles.profileButtonText}>  Add Experience  </Text>
            </Button>
            
            <Button 
              bordered 
              onPress={this.onCreateEducation}
              success
              style={styles.profileButton}
            >
                <Icon name="graduation-cap" size={20} style={{paddingLeft:5}}/>
                <Text style={styles.profileButtonText}>  Add Education  </Text>
            </Button>

            
        </View>
    )
  }
}




export default UserActions

const styles = StyleSheet.create({
  profileaction:{
    flexWrap: 'wrap', 
    flexDirection:'row',
    justifyContent:"space-around",
  },
  profileButton:{
    marginVertical: 10,
    borderRadius: 10,
    borderWidth:2
  },
  profileButtonText:{
    fontSize:16,
    fontWeight:"300",
    textAlign:"center",
    color:"rgb(65, 74, 77)"
  }
})