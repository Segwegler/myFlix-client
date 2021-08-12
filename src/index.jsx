import React from 'react';
import ReactDOM from 'react-dom';

//import statement to indicate that you need to bundle './index.scss'
import './index.scss';

//main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  }
}


//find root of the app
const container = document.getElementsByClassName('app-container')[0];

//telles react to render app in root of DOM
ReactDOM.render(React.createElement(MyFlixApplication), container);
