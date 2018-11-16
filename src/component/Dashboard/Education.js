import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { 
  Text, 
  View, 
  TouchableOpacity,
  StyleSheet
 } from 'react-native'
import { deleteEducation } from '../../actions/profileActions';


class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {

  
    const education = this.props.education.map(edu => (
      <View key={edu._id}>
        <View style={styles.school}>
          <Text style={styles.schoolText}>School :- </Text>
          <Text style={styles.schoolTextContent}>{edu.school}</Text>
        </View>
        <View style={styles.school}>
          <Text style={styles.schoolText}>Degree :- </Text>
          <Text style={styles.schoolTextContent}>{edu.degree}</Text>
        </View>
        <View style={styles.school}>
          <Text style={styles.schoolText}>Statrs from :- </Text>
          <Text style={styles.schoolTextContent}>{edu.from} - </Text>
          {edu.to === null ? (
              <Text style={styles.schoolTextContent}>Now</Text>
            ) : (
              <Text style={styles.schoolTextContent}>{edu.to}</Text>
            )}
        </View>
          
          
        <TouchableOpacity onPress={this.onDeleteClick.bind(this)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    ));


    return (
      <View>
        <Text >Education</Text>
        {education}
      </View>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);


const styles = StyleSheet.create({
  school:{
        flexDirection:'row',
  },
  schoolText:{
    fontSize:16,
    fontWeight:"500",

  },
  schoolTextContent:{
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
