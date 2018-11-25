import React, { Component } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  ScrollView,
  RefreshControl
 } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../Spinner';
import { getPosts } from '../../actions/postActions';


class Posts extends Component {

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
    refreshing: false,
  };
}
  componentDidMount() {
    this.props.getPosts();
  }

  _onRefresh(){
    this.setState({refreshing:true})
    this.props.getPosts();
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 1000);
  }
    

  render() {

    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
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
        <PostForm />
        <View 
          style={{marginBottom:15}}
        >
          {postContent}
        </View>
        
       
      </ScrollView>
    )
  }
}


Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})
