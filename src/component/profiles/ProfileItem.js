import React, { Component } from 'react';
import { Text, View, FlatList,ScrollView,Image ,StyleSheet , Actions,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import { List, ListItem } from 'react-native-elements';

class ProfileItem extends Component {

  onProfilePress(){
    Actions.Profile()
  }

  render() {

    const { profile } = this.props;

    return (
      <TouchableOpacity onPress={this.onProfilePress.bind(this)}>
        <View style={styles.container}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri : profile.user.avatar}}
          />
          <View>
            <Text 
              style={{fontSize:20, marginTop:5}}
            >
              {profile.user.name}
            </Text>
            <Text 
              style={{fontSize:15, marginTop:5}}
            >
              {profile.status} {isEmpty(profile.company) ?
              null : (
               <Text
                style={{fontSize:15, marginTop:5}}
               >
                at {profile.company}
               </Text>
              )}
            </Text>
            <Text>{isEmpty(profile.location) ? null : (<Text>{profile.location}</Text>)}</Text>
          </View>
        </View>
        <View
          style={{borderWidth:1,borderBottomColor:"black"}}
        />
        
      </TouchableOpacity>
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
