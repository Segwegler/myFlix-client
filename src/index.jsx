import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

//import components
import MainView from './components/main-view/main-view';

//import statement to indicate that you need to bundle './index.scss'
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

//main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}


//find root of the app
const container = document.getElementsByClassName('app-container')[0];

//telles react to render app in root of DOM
ReactDOM.render(React.createElement(MyFlixApplication), container);
