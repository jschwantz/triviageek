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
import AnswersList from './AnswersScreen'
import SingleQuestion from './SingleQuestion'
import AnswerInput from './AnswerInput'

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
  const {returnHome} = props

  const answerInputHandler = enteredText => {
    setEnteredAnswer(enteredText)
  }

  const addAnswerHandler = () => {
    const copyGameData = gameData.map((question, index) => {
      if (index === currIdx) {
        let correct = false
        if (question.answer.toLowerCase() === enteredAnswer.toLowerCase())
          correct = true
        return {...question, enteredAnswer, correct}
      } else return {...question}
    })
    setGameData(copyGameData)
    setEnteredAnswer('')
    const nextIdx = currIdx + 1
    if (nextIdx === gameData.length) {
      setRoundFinished(true)
      returnHome(copyGameData)
    } else {
      setCurrIdx(nextIdx)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await props.client.query({
          query,
          fetchPolicy: 'no-cache'
        })
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
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        {isRoundFinished ? (
          <AnswersList gameData={gameData} />
        ) : (
          <View style={styles.container}>
            <SingleQuestion gameData={gameData} currIdx={currIdx} />
            <AnswerInput
              answerInputHandler={answerInputHandler}
              enteredAnswer={enteredAnswer}
              addAnswerHandler={addAnswerHandler}
            />
          </View>
        )}
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
  }
})

export default withApollo(QuestionsScreen)
