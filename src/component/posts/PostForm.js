import React, { Component } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
 } from 'react-native';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import { Button } from 'native-base';

class PostForm extends Component {


  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onPostAdd(text){
    this.setState({text})
  }
  

  onSubmit() {

    const { user } = this.props.auth;

    const postData = {
      text : this.state.text,
      name:user.name,
      avatar:user.avatar
    };

    this.props.addPost(postData);
    this.setState({ text: ""})
  }



  render() {

    const { errors } = this.state;


    return (
      <View behavior="padding" style={styles.container}>
        <Text> say something... </Text>
          <View>
            <TextInput
              placeholder="Twitter Profile URL"
              value={this.state.text}
              onChangeText={this.onPostAdd.bind(this)}
              multiline={true}
              style={styles.textInput}
            />
              {errors && (<Text style={{color:"red"}}>{errors.text}</Text>)}
          </View>
            <Button 
              block 
              success
              onPress={this.onSubmit.bind(this)}
              style={styles.button}
            >
              <Text>Submit </Text>
            </Button>
      </View>
    )
  }
}


PostForm.propTypes = {
  addPost:PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors  : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps, { addPost })(PostForm);


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: "center",
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
});