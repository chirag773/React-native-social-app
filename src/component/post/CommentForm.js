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
import { addComment } from '../../actions/postActions';
import { Button } from 'native-base';

class CommentForm extends Component {


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

  onCommentAdd(text){
    this.setState({text})
  }

  onSubmit() {

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text : this.state.text,
      name:user.name,
      avatar:user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: '' });
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
            onChangeText={this.onCommentAdd.bind(this)}
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

CommentForm.propTypes = {
  auth : PropTypes.object.isRequired,
  errors  : PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);


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