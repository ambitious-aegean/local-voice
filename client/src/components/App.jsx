import React from 'react';
import styles from './styles.module.css';

import Home from './Home/Home.jsx';
import LogIn from './LogIn/LogIn.jsx';

// sends user to either LogIn page or Home
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div id="app" className={styles.app}>
        {!loggedIn
          ? <Home />
          : <LogIn />}
      </div>
    );
  }
}

export default App;
