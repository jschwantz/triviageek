import React from 'react'
import {View, Text} from 'react-native'

const SingleQuestion = props => {
  const {gameData, currIdx} = props.gameData
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

export default SingleQuestion
