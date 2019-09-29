import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
  Modal
} from 'react-native'

import {Query, withApollo} from 'react-apollo'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'

const QuestionsScreen = props => {
  const query = gql`
    query {
      questions {
        id
        question
        answer
        category {
          title
        }
      }
    }
  `
  const [gameData, setGameData] = useState([])
  const [currIdx, setCurrIdx] = useState(0)
  // const [currentQuestion, setCurrentQuestion] = useState({})
  const [enteredAnswer, setEnteredAnswer] = useState('')
  const [isRoundFinished, setRoundFinished] = useState(false)

  const answerInputHandler = enteredText => {
    setEnteredAnswer(enteredText)
  }

  const addAnswerHandler = () => {
    const copyGameData = gameData.map((question, index) => {
      if (index === currIdx) return {...question, enteredAnswer}
      else return {...question}
    })
    setGameData(copyGameData)
    setEnteredAnswer('')
    const nextIdx = currIdx + 1
    if (nextIdx === gameData.length) {
      setRoundFinished(true)
    } else {
      setCurrIdx(nextIdx)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await props.client.query({query})
        if (data && data.questions) {
          setGameData(data.questions)
          // setCurrentQuestion(data.questions[0])
        }
      } catch (error) {
        console.error('error: ', error)
      }
    }
    fetchData()
  }, [])

  if (gameData.length === 0) return <Text>Loading...</Text>
  if (isRoundFinished)
    return (
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={gameData}
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
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text>
            Category:{' '}
            {gameData[currIdx].category && gameData[currIdx].category.title}
          </Text>
        </View>
        <View>
          <Text>{gameData[currIdx].question}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your Answer"
            style={styles.input}
            onChangeText={answerInputHandler}
            value={enteredAnswer}
          />
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button title="Submit Answer" onPress={addAnswerHandler} />
            </View>
            <View style={styles.button}>
              <Button title="Cancel" color="red" onPress={props.onCancel} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 30
  },
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

export default withApollo(QuestionsScreen)
