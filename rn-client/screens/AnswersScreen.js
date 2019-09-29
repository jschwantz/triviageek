import React from 'react'
import {FlatList, View, ScrollView, Text, StyleSheet} from 'react-native'

const AnswersList = props => {
  console.log(props.gameData)
  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={props.gameData}
      renderItem={({item}) => {
        return (
          <ScrollView style={styles.contentContainer}>
            <Text>Question: {item.question}</Text>
            <View>
              <Text
                style={item.correct ? styles.correctText : styles.incorrectText}
              >
                Your Answer: {item.enteredAnswer}
              </Text>
            </View>
            <View>
              <Text style={styles.correctText}>
                Correct Answer: {item.answer}
              </Text>
            </View>
          </ScrollView>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30
  },
  correctText: {
    color: 'green'
  },
  incorrectText: {
    color: 'red'
  }
})

export default AnswersList
