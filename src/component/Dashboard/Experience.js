import React, { Component } from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity,
  StyleSheet
 } from 'react-native'
import { deleteExperience } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Experience extends Component {

  onDeleteClick(id){
    this.props.deleteExperience(id)
  }


  render() {


    const experience = this.props.experience.map(exp => (
      <View key={exp._id}>
        <View style={styles.experience}>
          <Text style={styles.experienceText}>Company :- </Text>
          <Text style={styles.experienceTextContent}>{exp.company}</Text>
        </View>
        <View style={styles.experience}>
          <Text style={styles.experienceText}>Job Title :- </Text>
          <Text style={styles.experienceTextContent}>{exp.title}</Text>
        </View>
        <View style={styles.experience}>
        <Text style={styles.experienceText}>Starts From :- </Text>
        <Text style={styles.experienceTextContent}>{exp.from} - </Text>
        {exp.to === null ? (
              <Text style={styles.experienceTextContent}>Now</Text>
            ) : (
              <Text style={styles.experienceTextContent}>{exp.to}</Text>
            )}
        </View>
          
          
        <TouchableOpacity onPress={this.onDeleteClick.bind(this)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    ));
    return (
      <View>
        <Text>====================Experience======================</Text>
        {experience}
        <Text>====================================================</Text>
      </View>
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
  experience:{
    flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
  },
  experienceText:{
    fontSize:16,
    fontWeight:"500",

  },
  experienceTextContent:{
    fontSize:16,
    fontWeight:"300"
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