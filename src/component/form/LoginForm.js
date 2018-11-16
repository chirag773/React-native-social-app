import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View ,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    ToastAndroid
    } from 'react-native';
import {Actions} from "react-native-router-flux";
import { connect } from "react-redux";
import { loginuser } from "../../actions/authActions";
import PropTypes from "prop-types";
import Icons from 'react-native-vector-icons/FontAwesome';


class LoginForm extends React.Component {

  static navigationOptions = {
    header:null
}


  constructor(){
    super();
      this.state={
        email:"",
        password:"",
        errors:{}
    }
  }

  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  };

    onEmail(email){
      this.setState({email})
    }

    onPassword(password){
      this.setState({password})
    }

  onLoginPress(){
    const userData = {
      email:this.state.email,
      password:this.state.password,
    }
    this.props.loginuser(userData);
  }
  
  goSignup(){
    Actions.signup()
  }

  render() {

    const { errors } = this.state;


    return (      
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.loginText}>L O G I N</Text>
          </View>
            <View>
              <Icons name="user" size={28}
                style={styles.InputIcons}
              />
              <TextInput style={styles.textInput} 
                        placeholder="Email"
                        placeholderTextColor="black"
                        underlineColorAndroid="rgba(0,0,0,0)" 
                        // autoFocus={true}
                        onSubmitEditing={()=>this.password.focus()} 
                        keyboardType="email-address"  
                        value={this.state.email}
                        onChangeText={this.onEmail.bind(this)}
              />
               {errors && (<Text style={{color:"red", marginLeft:10,marginTop:3}}>{errors.email}</Text>)}
            </View>
            <View>
              <Icons name="lock" size={28}
                style={styles.InputIcons}
              />
              <TextInput style={styles.textInput} 
                          password="password"
                          placeholder="Password"
                          placeholderTextColor="black"
                          secureTextEntry={true}
                          underlineColorAndroid="rgba(0,0,0,0)"
                          ref={(input)=>this.password = input}
                          value={this.state.password}
                          onChangeText={this.onPassword.bind(this)}
              />
               {errors && (<Text style={{color:"red", marginLeft:10, marginTop:3}}>{errors.password}</Text>)}
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onLoginPress.bind(this)}>
              <Text style={styles.buttonText}>
                  Login 
              </Text>    
            </TouchableOpacity>
            <View style={styles.signuptextcont}>
              <Text style={styles.signuptext}>
                First time here? 
              </Text>
              <TouchableOpacity onPress={this.goSignup.bind(this)}> 
                <Text style={styles.signupbutton}> SignUp</Text>
              </TouchableOpacity>
            </View>
       </KeyboardAvoidingView>
    );
  }
}

LoginForm.propTypes = {
  loginuser : PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps,{loginuser})(LoginForm);



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(86, 66, 60)',  
    justifyContent: 'center',
  },
  top:{
    alignItems: 'center',
    
  },
  loginText:{
    color:"white",
    fontSize: 28,
    paddingLeft: 40,
    paddingRight: 40,
    
  },
  InputIcons:{
    position:"absolute",
    marginTop: 21,
    left:15,
    elevation:1
  },
  textInput:{
      width:340,
      marginTop: 10,
      fontSize:15,
      height:50,
      paddingLeft: 50,
      color:"white",
      borderBottomColor:"white",
      borderBottomWidth:1
  },
  button:{
    width:340,
    backgroundColor:"black",
    marginVertical: 10,
    paddingVertical: 16,
    borderRadius: 30,
  },
  buttonText:{
      fontSize:16,
      fontWeight:"500",
      textAlign:"center",
      color:"white"
      
  },
  signuptextcont:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  signuptext:{
    fontSize: 15,
    color:"white",
  },
  signupbutton:{
    fontWeight:"500"
  }
});