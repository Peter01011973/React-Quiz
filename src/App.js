import React from 'react';
import Layout from './HOC/Layout/Layout.js'
import './App.css';
import Quiz from './containers/Quiz/quiz.js'
import { Route, Switch } from 'react-router-dom'
import QuizCreator from './containers/QuizCreator/QuizCreator.js'
import Auth from './containers/Auth/Auth.js'
import QuizList from './containers/QuizList/QuizList.js'

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/auth'><Auth/></Route>
          <Route path='/quiz-creator'><QuizCreator/></Route>
          <Route path='/quiz/:id'><Quiz/></Route>
          <Route path='/'><QuizList/></Route>
        </Switch>
      </Layout>
    )
  }
}
export default App;


