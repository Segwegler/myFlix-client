import React from 'react';
import ReactDOM from 'react-dom';

//import components
import MainView from './components/main-view/main-view';

//import statement to indicate that you need to bundle './index.scss'
import './index.scss';



//main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}


//find root of the app
const container = document.getElementsByClassName('app-container')[0];

//telles react to render app in root of DOM
ReactDOM.render(React.createElement(MyFlixApplication), container);
