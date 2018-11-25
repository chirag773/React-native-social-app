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
import { addExperience } from '../../actions/profileActions';
import { Button } from 'native-base';


class AddExperience extends Component {


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
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
     current:false,
      description: '',
      errors: {},
      disabled:false
    };

  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // ====================================================================//

  onCompany(company){
    this.setState({company})
  }

  onJobTitle(title){
    this.setState({title})
  }
  
  onLocation(location){
    this.setState({location})
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


  //================================submit=============================//

  onSubmit() {

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData);
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
        <Text> Add any developer/programming positions that you have had in the past </Text>
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <View>
                <TextInput style={styles.textInput} 
                  placeholder="* Company"
                  placeholderTextColor="black"
                  underlineColorAndroid="rgba(0,0,0,0)" 
                  value={this.state.company}
                  onChangeText={this.onCompany.bind(this)}
                />
                  {errors && (<Text style={{color:"red"}}>{errors.company}</Text>)}
            </View>
            <View>
                <TextInput style={styles.textInput} 
                  placeholder="* Job Title"
                  placeholderTextColor="black"
                  underlineColorAndroid="rgba(0,0,0,0)" 
                  value={this.state.title}
                  onChangeText={this.onJobTitle.bind(this)}
                />
                  {errors && (<Text style={{color:"red"}}>{errors.title}</Text>)}
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
            <Text style={{marginTop: 5}}> Current Job</Text>
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
            <Button 
              block 
              success
              onPress={this.onSubmit.bind(this)}
              style={styles.button}
              >
              <Text>Submit </Text>
            </Button>
             
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  }
}



AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(AddExperience);


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
  button:{
    marginVertical: 20,
    height:50,
  },
  buttonText:{
      fontSize:16,
      fontWeight:"500",
      textAlign:"center",
      color:"white"
      
  },
})
