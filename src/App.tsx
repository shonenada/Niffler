import * as React from 'react';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';

interface AppProps {}

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;