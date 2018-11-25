import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

class ProfileCreds extends Component {
  
  render() {


    const { education, experience } = this.props;

    const expItems = experience.map(exp => (
      <View key={exp._id}>
          <View style={styles.company}>
            <Text style={styles.companyText}>Company:- </Text>
            <Text style={styles.companyName}>{exp.company}</Text>
          </View>
       

          <View style={styles.company}>
            <Text style={styles.companyText}>Starts From:- </Text>
            <Text style={styles.companyName}>{exp.from} - </Text>
              {exp.to === null ? (
                  <Text style={styles.companyName}>Now</Text>
                ) : (
                  <Text style={styles.companyName}>{exp.to}</Text>
              )}
          </View>

          <View style={styles.company}>
            <Text style={styles.companyText}>Position:- </Text>
            <Text style={styles.companyName}>{exp.title}</Text>
          </View>

          <View style={styles.company}>
            <Text style={styles.companyText}>
              Location:- 
            </Text>
              {exp.loaction === "" ? null : (
                <Text style={styles.companyName}>{exp.location}</Text>
              )}
            
          </View>

          <View style={styles.company}>
            <Text style={styles.companyText}>
              Description:-
            </Text>
              {exp.description === "" ? null : (
                <Text style={styles.companyName}> {exp.description}</Text>
              )}
          </View>

          <View style={{backgroundColor:"grey", height:1, marginBottom:5, marginTop:5}}/>

      </View>
              
    ))

    //education

    const eduItems = education.map(edu => (
      <View  key={edu._id}>

          <View style={styles.company}>
            <Text style={styles.companyText}>School:- </Text>
            <Text style={styles.companyName}>{edu.school}</Text>
          </View>

          <View style={styles.company}>
            <Text style={styles.companyText}>Starts From:- </Text>
            <Text style={styles.companyName}>{edu.from} - </Text>
              {edu.to === null ? (
                  <Text style={styles.companyName}>Now</Text>
                ) : (
                  <Text style={styles.companyName}>{edu.to}</Text>
              )}
          </View>

          <View style={styles.company}>
            <Text style={styles.companyText}>Degree:- </Text>
            <Text style={styles.companyName}>{edu.degree}</Text>
          </View>

          <View style={styles.company}>
            <Text style={styles.companyText}>Field of study:- </Text>
            <Text style={styles.companyName}>{edu.fieldofstudy}</Text>
          </View>
          

          <View style={styles.company}>
            <Text style={styles.companyText}>
              Description:-
            </Text>
              {edu.description === "" ? null : (
                <Text style={styles.companyName}> {edu.description}</Text>
              )}
          </View>
          <View style={{backgroundColor:"grey", height:1, marginBottom:5, marginTop:5}}/>
      </View>
              
    ))



    return (
      <View style={{marginBottom:10}}>
        <Card title='Experience'>
            {expItems.length > 0 ? (
              <View>{expItems}</View>
            ) : (
              <Text>No Experience Listed</Text>
            )} 
            
        </Card>

        <Card title='Education'>
            {eduItems.length > 0 ? (
              <View>{eduItems}</View>
            ) : (
              <Text>No Education Listed</Text>
            )} 
        </Card>
      </View>
    )
  }
}


export default ProfileCreds;


const styles = StyleSheet.create({
  company:{
    flexWrap:"wrap",
    flexDirection:"row"
  },
  companyText:{
    fontSize:15,
  },
  companyName:{
    fontSize:15,
    fontStyle:"italic",
    color:"#0394c0"
  },
})