import React, { Component } from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity,
  StyleSheet
 } from 'react-native'
 import PropTypes from "prop-types";
 import { connect } from "react-redux";
 import { Card} from 'react-native-elements'
import { deleteExperience } from "../../actions/profileActions";
import Icon from "react-native-vector-icons/MaterialIcons"

class Experience extends Component {

  onDeleteClick(id){
    this.props.deleteExperience(id)
  }


  render() {


    const experience = this.props.experience.map(exp => (
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

          <View style={styles.company} >
            <Text style={styles.companyText}>
              Description:-
            </Text>
              {exp.description === "" ? null : (
                <Text style={styles.companyName}> {exp.description}</Text>
              )}
          </View>

          {/* <TouchableOpacity onPress={this.onDeleteClick.bind(this)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity> */}

          <View style={{backgroundColor:"grey", height:1, marginBottom:5, marginTop:5}}/>

      </View>
    ));
    return (
      <Card title="Experience">
        {experience}
      </Card>
    )
  }
}


Experience.propTypes = {
  deleteExperience:PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
  profile:state.profile,
  
})

export default connect(mapStateToProps , { deleteExperience })(Experience);



const styles = StyleSheet.create({
  company:{
    flexWrap:"wrap",
    flexDirection:"row",
  },
  companyText:{
    fontSize:15,
  },
  companyName:{
    fontSize:15,
    fontStyle:"italic",
    color:"#0394c0",
    
  },
  deleteButton:{
    backgroundColor:"red",
    height:30,
    width:60
  },
  deleteButtonText:{
    fontSize:16,
    fontWeight:"500",
    textAlign:"center",
    color:"white"
  }
});