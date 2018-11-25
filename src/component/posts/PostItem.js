import React, { Component } from 'react';
import { 
  Text, 
  View ,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from "react-redux";
import { Card,Avatar } from 'react-native-elements';
import PropTypes from "prop-types";
import { 
  deletePost, 
  addLike, 
  disLike, 
  removeLike, 
  removedisLike 
} from '../../actions/postActions';
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';

class PostItem extends Component {


  
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onDisLikeClick(id) {
    this.props.disLike(id);
  }

  onUnLikeClick(id) {
    this.props.removeLike(id);
  }

  onUnDisLikeClick(id) {
    this.props.removedisLike(id);
  }

  onCommentGoButton(){
    Actions.comment({id:this.props.post._id})
  }

  

  findUserLike(likes) {
    const { auth,post} = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return (
          <TouchableOpacity
            onPress={this.onUnLikeClick.bind(this,post._id)}
            style={styles.LikedButton}
          >
            <Icon name="thumbs-up"  style={{color:"blue"}} size={22}/>
          </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={this.onLikeClick.bind(this,post._id)}
          style={styles.LikeButton}
        >
          <Icon name="thumbs-up" size={22}/>
        </TouchableOpacity>
      )
    }
  }

  findUserDisLike(dislikes) {
    const { auth,post } = this.props;
    if (dislikes.filter(dislike => dislike.user === auth.user.id).length > 0) {
      return (
        <TouchableOpacity
          onPress={this.onUnDisLikeClick.bind(this,post._id)}
          style={styles.LikedButton}
        >
          <Icon name="thumbs-down" style={{color:"blue"}} size={22}/>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={this.onDisLikeClick.bind(this,post._id)}
          style={styles.LikeButton}
        >
           <Icon name="thumbs-down" size={22}/>
        </TouchableOpacity>
      )
    }
  }



  render() {

    const { post, auth, showActions } = this.props;


    return (


      <Card
        title={post.name}
      >
        <View>
          <View style={{flexWrap:"wrap", flexDirection:"row", marginBottom:10}}>
            <Avatar
              size="small"
              rounded
              source={{uri: "http:"+post.avatar}}
              activeOpacity={0.7}
            />
            <Text style={{marginLeft:5,fontWeight:"bold"}}>{post.text}</Text>
          </View>
          
         

          { showActions ? (

              <View style={styles.likeDislikeWrapper}>
                <View style={styles.Like}>
                  
                    {this.findUserLike(post.likes)}
                    <Text style={{marginLeft:5,fontWeight:"bold"}}>{post.likes.length}</Text>
                </View>
              
                <View style={styles.disLike}>

                  
                    {this.findUserDisLike(post.dislikes)}
                    <Text style={{marginLeft:5,fontWeight:"bold"}}>{post.dislikes.length}</Text>
                </View>

                <View style={styles.disLike}>
                  <TouchableOpacity
                    onPress={this.onCommentGoButton.bind(this)}
                  >
                    <Text style={{
                      marginLeft:5,
                      fontWeight:"bold", 
                      fontSize:14, 
                      color:"blue"
                    }}>Comment</Text>
                  </TouchableOpacity>
                </View>


                  { post.user === auth.user.id ? (
          
                  <View style={styles.disLike}>
                    <TouchableOpacity
                      onPress={this.onDeleteClick.bind(this, post._id)}
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
                    
                ) : null }
              </View>

                
             
            
          ): null } 
        </View>
    </Card>


 
    
      
    )
  }
}


PostItem.defaultProps = {
  showActions: true
};



PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  disLike: PropTypes.func.isRequired,
  removedisLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, disLike, removeLike,removedisLike })(
  PostItem
);

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