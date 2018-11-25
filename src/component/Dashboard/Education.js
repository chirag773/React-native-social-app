import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Card} from 'react-native-elements';
import { 
  Text, 
  View, 
  TouchableOpacity,
  StyleSheet
 } from 'react-native'
import { deleteEducation } from '../../actions/profileActions';
import Icon from "react-native-vector-icons/FontAwesome"


class Education extends Component {

  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {

    const education = this.props.education.map(edu => (
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
        

        <View style={styles.company} multiline={true}>
          <Text style={styles.companyText}>
            Description:-
          </Text>
            {edu.description === "" ? null : (
              <Text style={styles.companyName}> {edu.description}</Text>
            )}
        </View>
{/*             
        <TouchableOpacity onPress={this.onDeleteClick.bind(this)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity> */}

        <View style={{backgroundColor:"grey", height:1, marginBottom:5, marginTop:5}}/>


      </View>
    ));


    return (
      <View style={{marginBottom:10}}>
        <Card title="Education" >
          {education}
        </Card>
      </View>
      
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);


const styles = StyleSheet.create({
  company:{
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
