import React, { Component } from 'react';
import { 
   View, 
   FlatList,
   ScrollView,
   Image ,
   StyleSheet ,
   TouchableOpacity
  } from 'react-native';
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import {Actions} from "react-native-router-flux";
import { 
  Container, 
  Header, 
  Content, 
  List, 
  ListItem, 
  Left, 
  Body, 
  Right, 
  Thumbnail, 
  Text,
  Button
} from 'native-base';


class ProfileItem extends Component {

  onProfilePress(){
    Actions.profile({id:this.props.profile._id})
  }

  render() {

    const { profile } = this.props;

    return (
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{uri : "http:"+profile.user.avatar}} />
              </Left>
              <Body>
                <Text>{profile.user.name}</Text>
                <Text note numberOfLines={1}>
                  {profile.status} {isEmpty(profile.company) ?
                null : (
                <Text
                  style={{fontSize:15, marginTop:5}}
                  note
                >
                  at {profile.company}
               </Text>
              )}
                </Text>
                <Text note>{isEmpty(profile.location) ? null : (<Text note>{profile.location}</Text>)}</Text>
              </Body>
              <Right>
                <TouchableOpacity  onPress={this.onProfilePress.bind(this)}>
                  <Text style={{color:"blue"}}>View</Text>
                </TouchableOpacity>
              </Right>
            </ListItem>
          </List>
      
    )
  }
}


ProfileItem.propTypes = {
  profile:PropTypes.object.isRequired
}


export default ProfileItem

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row'
  }
})
