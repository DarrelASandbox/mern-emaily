import { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as actions from './actions';
import { Dashboard, Header, Landing, SurveyNew } from './components';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />

          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/surveys' element={<Dashboard />} />
            <Route path='/surveys/new' element={<SurveyNew />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
