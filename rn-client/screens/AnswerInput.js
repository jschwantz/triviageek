import React from 'react'
import {ScrollView, View, TextInput, StyleSheet, Button} from 'react-native'

const AnswerInput = props => {
  const {answerInputHandler, enteredAnswer, addAnswerHandler} = props
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.inputContainer}
    >
      <TextInput
        placeholder="Your Answer"
        style={styles.input}
        onChangeText={answerInputHandler}
        value={enteredAnswer}
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Submit" onPress={addAnswerHandler} />
        </View>
        <View style={styles.button}>
          <Button title="Quit" color="red" onPress={props.onCancel} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  },
  button: {
    width: '40%'
  }
})

export default AnswerInput
