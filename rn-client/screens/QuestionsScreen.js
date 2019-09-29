import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TextInput,
  Stylesheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
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
      }
    }
  `
  const [gameData, setGameData] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await props.client.query({query})
        if (data && data.questions) {
          setGameData(data.questions)
          setCurrentQuestion(data.questions[0])
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
      <ScrollView>
        <View>
          <Text>{currentQuestion.question}</Text>
          <Text>{currentQuestion.answer}</Text>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default withApollo(QuestionsScreen)
