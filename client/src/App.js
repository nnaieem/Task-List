import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ItemList from './components/ItemList';
import ItemModal from './components/ItemModal';
import ItemModalEdit from './components/ItemModalEdit';

import { Provider } from 'react-redux';
import store from './store/store';

import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return ( //provider provide a way to share states between components
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ItemModalEdit />
            <ItemList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
