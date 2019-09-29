import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {ExpoLinksView} from '@expo/samples'
import QuestionsScreen from '../screens/QuestionsScreen'

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <QuestionsScreen />
      <ExpoLinksView />
    </ScrollView>
  )
}

LinksScreen.navigationOptions = {
  title: 'Links',
  QuestionsScreen: 'Questions'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})
