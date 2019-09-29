import React from 'react'
import {FlatList, View, ScrollView, Text, StyleSheet} from 'react-native'

const AnswersList = props => {
  const {gameData} = props
  const score = gameData.reduce((sum, curVal) => {
    return sum + (curVal.correct ? 1 : 0)
  }, 0)
  return (
    <View style={styles.contentContainer}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={gameData}
        renderItem={({item}) => {
          return (
            <ScrollView style={styles.contentContainer}>
              <Text>Question: {item.question}</Text>
              <View>
                <Text
                  style={
                    item.correct ? styles.correctText : styles.incorrectText
                  }
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
      <View>
        <Text>
          {`\n\nYour Total Score for the Round: ${score}/${gameData.length}`}
          {`\n`}
          {score / gameData.length === 1
            ? 'Perfect Score!'
            : score / gameData.length >= 0.5
              ? 'Good Job, Keep it Up'
              : 'Better Luck Next Time'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
    flex: 1
  },
  correctText: {
    color: 'green'
  },
  incorrectText: {
    color: 'red'
  }
})

export default AnswersList
