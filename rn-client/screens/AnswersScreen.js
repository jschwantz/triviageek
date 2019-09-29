import React from 'react'
import {FlatList, View, Text} from 'react-native'

const AnswersList = props => {
  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={props.gameData}
      renderItem={({item}) => {
        return (
          <View>
            <Text>{item.question}</Text>
            <Text>{item.answer}</Text>
          </View>
        )
      }}
    />
  )
}

export default AnswersList
