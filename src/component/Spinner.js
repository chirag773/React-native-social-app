import React, { Component } from 'react'
import { Text, View, ActivityIndicator,StyleSheet } from 'react-native'

export default class Spinner extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <ActivityIndicator size={50} color="blue"/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
})