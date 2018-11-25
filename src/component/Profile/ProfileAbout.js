import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {

  render() {

    const {profile } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];

    //getting skills from array
    const skills = profile.skills.map((skill,index)=>(
      <View  key={index}>
        <Text style={styles.skillText}>
          {skill},
        </Text>
      </View>
      
    ))
    

    return (
      <View style={styles.About}>
        <View style={styles.nameWrapper}>
            <Text style={styles.firstname}>{firstName} Bio</Text>
        </View>
          <View style={styles.Bio}>
            <Text>
              {isEmpty(profile.bio) ? (<Text style={styles.bioText}>{firstName} does not have a bio</Text>) : (
                (
                  <Text multiline={true} style={styles.bioText}>{profile.bio}</Text>
                )
              )}
            </Text>
          </View>
          
          <View style={styles.skillWrapper}>
            <Text style={styles.skillSetText}>Skill Set</Text>
          </View>
          <View style={styles.mainSkill}>
              {skills}
          </View>
      </View>
    )
  }
}


export default ProfileAbout;


const styles = StyleSheet.create({
  About:{
    flex:1,
  },
  nameWrapper:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    padding:10,
  },
  firstname:{
    color:"white",
    fontWeight: 'bold',
    fontSize:20,
  },
  Bio:{
    flex:1,
    marginLeft:10
    
  },
  bioText:{
    marginLeft: 10,
    paddingTop:10,
    fontSize:18,
    fontStyle: 'italic',
    color:"#0394c0"
  },
  skillWrapper:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    padding:10,
  },
  skillSetText:{
    color:"white",
    fontWeight: 'bold',
    fontSize:20,
  },
  mainSkill:{
    flex:1,
    marginLeft:10,
    flexWrap:"wrap",
    flexDirection:"row"
  },
  skillText:{
    marginLeft: 10,
    paddingTop:5,
    fontSize:15,
    fontStyle: 'italic',
    color:"#0394c0"
  },
})