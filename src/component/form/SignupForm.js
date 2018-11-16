import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View ,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ToastAndroid
    } from 'react-native';

import {Actions} from "react-native-router-flux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registeruser } from "../../actions/authActions"
import Icons from 'react-native-vector-icons/FontAwesome';


class SignupForm extends React.Component {

  static navigationOptions = {
    header:null
}


    constructor(){
      super();
        this.state={
          name:"",
          email:"",
          password:"",
          password2:"",
          errors:{}
      }
      
    }

    onEmail(email){
      this.setState({email})
    }

    onName(name){
      this.setState({name})
    }

    onPassword(password){
      this.setState({password})
    }

    onPassword2(password2){
      this.setState({password2})
    }

    
  
    componentWillReceiveProps = (nextProps) => {
      if(nextProps.errors){
        this.setState({errors:nextProps.errors})
      }
    };
    
   
    onSignup(){

      const newUser = {
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
        password2:this.state.password2,
      }
      
      this.props.registeruser(newUser);
      
    }
    

    goLogin(){
      Actions.login()
      
    }

  render() {

    const { errors } = this.state;


    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.loginText}>S I G N U P</Text>
        </View>
        <View>
          <Icons name="user" size={28}
            style={styles.InputIcons}
          />
          <TextInput style={styles.textInput} 
                    placeholder="name"
                    placeholderTextColor="black"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    onChangeText={username =>  this.setState({username:username})}
                    ref={(input)=>this.username = input}
                    onSubmitEditing={()=>this.password.focus()} 
                    value={this.state.name}
                    onChangeText={this.onName.bind(this)}
          />
          {errors && (<Text style={{color:"red", marginLeft:10, marginTop:3}}>{errors.name}</Text>)}
        </View>
        <View>
          <Icons name="envelope" size={26}
            style={styles.InputIcons}
          />
          <TextInput style={styles.textInput} 
                    placeholder="Email"
                    autoCorrect={false}
                    placeholderTextColor="black"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    // autoFocus={true}
                    keyboardType="email-address"  
                    onSubmitEditing={()=>this.username.focus()} 
                    value={this.state.email}
                    onChangeText={this.onEmail.bind(this)}
                    
          />
          {errors && (<Text style={{color:"red", marginLeft:10, marginTop:3}}>{errors.email}</Text>)}
        </View>
        
        <View>
          <Icons name="lock" size={28}
            style={styles.InputIcons}
          />
          <TextInput style={styles.textInput} 
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
        <View>
          <Icons name="lock" size={28}
              style={styles.InputIcons}
            />
          <TextInput style={styles.textInput} 
                      placeholder="confirm Password"
                      placeholderTextColor="black"
                      secureTextEntry={true}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      ref={(input)=>this.password = input}
                      value={this.state.password2}
                      onChangeText={this.onPassword2.bind(this)}
                      
            />
            {errors && (<Text style={{color:"red", marginLeft:10, marginTop:3}}>{errors.password2}</Text>)}
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onSignup.bind(this)}>
            <Text style={styles.buttonText}>
                Signup 
            </Text> 
        </TouchableOpacity>   
        <View style={styles.signuptextcont}>
            <Text style={styles.signuptext}>
                Already have an account? 
            </Text>
            <TouchableOpacity onPress={this.goLogin.bind(this)}> 
                <Text style={styles.signupbutton}> SignIn</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


SignupForm.propTypes = {
  registeruser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
  auth:state.auth,
  errors:state.errors
})

export default connect(
  mapStateToProps,
  { registeruser }
)(SignupForm);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgb(119, 92, 91)'

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
    fontWeight:"500",
  }
});