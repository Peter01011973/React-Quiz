import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-ec444.firebaseio.com/'
})