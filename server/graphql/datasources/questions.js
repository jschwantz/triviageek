const {RESTDataSource} = require('apollo-datasource-rest')

class QuestionsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://jservice.io/api/'
  }
  async getQuestions() {
    const response = await this.get('random', {count: 3})
    return Array.isArray(response)
      ? response.map(question => this.questionReducer(question))
      : []
  }
  questionReducer(question) {
    return {
      id: question.id,
      external_id: question.id,
      question: question.question,
      answer: question.answer,
      value: question.value,
      category: question.category,
      round: 1
    }
  }
}

module.exports = QuestionsAPI
