import React, { Component } from 'react';
import { 
  Text, 
  View ,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import Icon from "react-native-vector-icons/FontAwesome";
import { Card,Avatar } from 'react-native-elements';

class CommentItem extends Component {

  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }


  render() {

    const { comment, postId, auth } = this.props;


    return (
      <Card
        title={comment.name}
      >
        <View>
          <View style={{flexWrap:"wrap", flexDirection:"row", marginBottom:10}}>
            <Avatar
              size="small"
              rounded
              source={{uri: "http:"+comment.avatar}}
              activeOpacity={0.7}
            />
            <Text style={{marginLeft:5,fontWeight:"bold"}}>{comment.text}</Text>
          </View>
          
         

              <View style={styles.likeDislikeWrapper}>
                {/* <View style={styles.Like}>
                  
                    {this.findUserLike(post.likes)}
                    <Text style={{marginLeft:5,fontWeight:"bold"}}>{post.likes.length}</Text>
                </View>
              
                <View style={styles.disLike}>

                  
                    {this.findUserDisLike(post.dislikes)}
                    <Text style={{marginLeft:5,fontWeight:"bold"}}>{post.dislikes.length}</Text>
                </View> */}


                 {comment.user === auth.user.id ? (
              
                  <View style={styles.disLike}>
                    <TouchableOpacity
                      onPress={this.onDeleteClick.bind(this, postId, comment._id)}
                    >
                      <Text 
                      style={{
                        marginLeft:5,
                        fontWeight:"bold", 
                        fontSize:14,
                        color:"red"
                      }}>Delete</Text>
                    </TouchableOpacity>
                  </View>

               

            ) : null}
              </View>

                
             
        </View>
    </Card>
    )
  }
}



CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);


const styles = StyleSheet.create({
  likeDislikeWrapper:{
    flexWrap:"wrap", 
    flexDirection:"row",
    marginTop:5
  },
  Like:{
    flexWrap:"wrap", 
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around"
  },
  
  
  disLike:{
    marginLeft:10,
    flexWrap:"wrap", 
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
})