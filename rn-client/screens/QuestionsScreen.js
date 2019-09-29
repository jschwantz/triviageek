import React from 'react'
import {
  View,
  Text,
  TextInput,
  Stylesheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native'

import {Query} from 'react-apollo'
import gql from 'graphql-tag'

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

  return (
    <ScrollView>
      <Text>Some data hopefully</Text>
      <Query query={query}>
        {({data, error, loading}) => {
          if (loading) return <Text>Loading..</Text>
          if (error) {
            console.log('Response Error------', error)
            return <Text>{error.message}</Text>
          }
          if (data) {
            return (
              <FlatList
                data={data.questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  console.log(item)
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
        }}
      </Query>
    </ScrollView>
  )
}

export default QuestionsScreen
