const questions = [
  {
    id: 1,
    external_id: 100,
    question: 'test?',
    answer: 'test!',
    value: 100,
    round: {
      id: 1,
      game: {
        id: 1,
        roundCount: 5,
        difficulty: 'Default'
      },
      category: {
        id: 1,
        title: 'test'
      },
      questions: []
    }
  }
]

module.exports = {
  Query: {
    questions: async (_, __, {dataSources}) => {
      // return questions
      const questionSet = await dataSources.questionsAPI.getQuestions()
      return questionSet
    },
    question(parent, args) {
      return questions[0]
    }
  }
}
