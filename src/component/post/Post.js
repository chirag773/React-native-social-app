import React, { Component } from 'react';
import { 
  Text, 
  View, 
  RefreshControl, 
  ScrollView , 
  FlatList,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../Spinner';
import { getPost } from '../../actions/postActions';

class Post extends Component {

  componentDidMount() {
    this.props.getPost(this.props.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }


  _onRefresh(){
    this.setState({refreshing:true})
    this.props.getPost(this.props.id);
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 1000);
  }

  render() {

    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <View>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </View>
      );
    }



    return (

      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <View 
          style={{marginBottom:15}}
        >
         {postContent}
        </View>
        
       
      </ScrollView>
     
    );
  }
}



Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#000"
  }
})