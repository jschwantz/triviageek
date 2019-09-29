import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const SingleQuestion = props => {
  const {gameData, currIdx} = props
  return (
    <View>
      <View style={styles.contentContainer}>
        <Text>
          Category:{' '}
          {gameData[currIdx].category && gameData[currIdx].category.title}
        </Text>
      </View>
      <View>
        <Text>{gameData[currIdx].question}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30
  }
})

export default SingleQuestion
