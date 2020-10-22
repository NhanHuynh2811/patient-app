import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { LocaleProvider } from 'antd';
import enGB from 'antd/lib/locale-provider/en_GB';
// import createHistory from 'history/createHashHistory';
// import { ConnectedRouter } from 'react-router-redux';
//import 'resources/_antd.less';
import Header from './comp/header';
import Routes from './comp/routes';
// const history = createHistory();
function App() {
  return (
    <Router>
      <div>
        {/* <ConnectedRouter history={history}> */}
        <LocaleProvider locale={enGB}>
          <Header />
          <Routes />
        </LocaleProvider>
        {/* </ConnectedRouter> */}
      </div>
    </Router>
  );
}

export default App;
