import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/scss/bootstrap.scss'
import './App.css';
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Home from './components/pages/Home'
// import Login from './components/pages/Login'
// import Register from './components/pages/Register'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SiteHeader />

          <Switch>
            {/* <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} /> */}

            <Route path="/">
              <Home />
            </Route>

          </Switch>

          <SiteFooter />
        </Router>
      </div>
    )

  }
}

export default App;
