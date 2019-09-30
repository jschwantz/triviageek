import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Modal} from 'react-native'

import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'
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
  const [enteredAnswer, setEnteredAnswer] = useState('')
  const [isRoundFinished, setRoundFinished] = useState(false)
  const {returnHome} = props

  const answerInputHandler = enteredText => {
    setEnteredAnswer(enteredText)
  }

  const addAnswerHandler = () => {
    if (enteredAnswer.length === 0) return
    const copyGameData = gameData.map((question, index) => {
      if (index === currIdx) {
        let correct = false
        if (
          question.answer
            .toLowerCase()
            .replace('<i>', '')
            .replace('</i>', '')
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .split(' ')
            .filter(word => word !== 'a' && word !== 'the' && word !== 'an')
            .join(' ') ===
          enteredAnswer
            .toLowerCase()
            .replace('<i>', '')
            .replace('</i>', '')
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .split(' ')
            .filter(word => word !== 'a' && word !== 'the' && word !== 'an')
            .join(' ')
        )
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
          // data.questions.forEach(question => {
          //   console.log('question', question.question)
          //   console.log('answer', question.answer)
          // })
          // console.log('questions', data.questions)
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
              onCancel={props.onCancel}
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
