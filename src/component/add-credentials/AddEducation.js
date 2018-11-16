import React, { Component } from 'react'
import { 
  Text, 
  View,
  TextInput,
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  CheckBox
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {


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
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }


  
  onSchool(school){
    this.setState({school})
  }

  onDegree(degree){
    this.setState({degree})
  }
  
  onFieldOfStudy(fieldofstudy){
    this.setState({fieldofstudy})
  }

  onFrom(from){
    this.setState({from})
  }

  onTo(to){
    this.setState({to})
  }

  onDescription(description){
    this.setState({description})
  }



  onSubmit() {

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData);
  }

  onCheck() {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }


  render() {

    
    const { errors } = this.state;


    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
      <Text style={styles.topText}> Add any school, bootcamp, etc that you have attended</Text>
      <View style={styles.scrollViewWrapper}>
        <ScrollView style={styles.scrollView}>
          <View>
              <TextInput style={styles.textInput} 
                placeholder="* School"
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.school}
                onChangeText={this.onSchool.bind(this)}
              />
                {errors && (<Text style={{color:"red"}}>{errors.school}</Text>)}
          </View>
          <View>
              <TextInput style={styles.textInput} 
                placeholder="* Degree"
                placeholderTextColor="black"
                underlineColorAndroid="rgba(0,0,0,0)" 
                value={this.state.degree}
                onChangeText={this.onDegree.bind(this)}
              />
                {errors && (<Text style={{color:"red"}}>{errors.degree}</Text>)}
          </View>
          <View>
            <TextInput style={styles.textInput} 
              placeholder="Field of Study"
              placeholderTextColor="black"
              underlineColorAndroid="rgba(0,0,0,0)" 
              value={this.state.fieldofstudy}
              onChangeText={this.onFieldOfStudy.bind(this)}
            />
              {errors && (<Text style={{color:"red"}}>{errors.fieldofstudy}</Text>)}
          </View>
          <View>
              <DatePicker
                style={{width: 320}}
                date={this.state.from}
                mode="date"
                placeholder="* From"
                format="YYYY-MM-DD"
                minDate="1995-01-01"
                maxDate="2030-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36,
                      marginTop:10,
                      borderRadius:10,
                      fontSize:16,
                      backgroundColor:"white"
                  }
                }}
                onDateChange={this.onFrom.bind(this)}
              />
                  {errors && (<Text style={{color:"red"}}>{errors.from}</Text>)}
          </View>
          <View>
            <DatePicker
                  style={{width: 320}}
                  date={this.state.to}
                  mode="date"
                  placeholder="* To"
                  format="YYYY-MM-DD"
                  minDate="1995-01-01"
                  maxDate="2030-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,

                    },
                    dateInput: {
                      marginLeft: 36,
                      marginTop:10,
                      borderRadius:10,
                      fontSize:16,
                      backgroundColor:"white"
                    }
                  }}
                  onDateChange={this.onTo.bind(this)}
                />
                  {errors && (<Text style={{color:"red"}}>{errors.to}</Text>)}
          </View>
          <View style={{flexDirection:"row"}}>
            <CheckBox
              title='Current Study'
              value={this.state.current}
              onValueChange={this.onCheck.bind(this)}
            />
            <Text style={{marginTop: 5}}> Current Study</Text>
          </View>
          <View>
            <TextInput style={styles.textInput} 
              placeholder="Job Description"
              multiline={true}
              placeholderTextColor="black"
              underlineColorAndroid="rgba(0,0,0,0)" 
              value={this.state.description}
              onChangeText={this.onDescription.bind(this)}
            />
              {errors && (<Text style={{color:"red"}}>{errors.description}</Text>)}
          </View>
          <View style={styles.submitView}>
            <TouchableOpacity style={styles.button} onPress={this.onSubmit.bind(this)}>
              <Text style={styles.buttonText}>
                Submit 
              </Text>    
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
    )
  }
}



AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(AddEducation);


const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    alignItems: 'center',
},
topText:{
  fontSize:15,
  textAlign:"center",
  fontWeight:"300"
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
  borderRadius: 30,
  paddingLeft: 50,
  backgroundColor:'white'
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
  button:{
    width:100,
    backgroundColor: "green",
    marginVertical: 20,
    borderRadius: 10,
    height:50,
    justifyContent:"center",
    marginLeft:"33%"
  },
  buttonText:{
      fontSize:16,
      fontWeight:"500",
      textAlign:"center",
      color:"white"
      
  },
})
