import React, { Component } from 'react';
import { Text, View, RefreshControl, ScrollView , FlatList} from 'react-native';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getProfile } from "../../actions/profileActions";
import ProfileItem from './ProfileItem';
import { Actions } from 'react-native-router-flux';

class Profiles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.getProfile()
  }

_onRefresh(){
  this.setState({refreshing:true})
  this.props.getProfile()
  setTimeout(() => {
    this.setState({refreshing: false});
  }, 1000);
}


  render() {

    const { profiles, loading } = this.props.profile;

    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner/>;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem
            key={profile._id} profile={profile}
           />
        ))
      } else {
        profileItems = <Text>There is No Profile</Text>
      }
    }


    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        {profileItems}
        
      </ScrollView>
    )
  }
}


Profiles.propTypes = {
  getProfile:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile:state.profile
})

export default connect(mapStateToProps,{getProfile})(Profiles);


