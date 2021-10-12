import { createContext, } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import Page1 from './conponent/page1/page1';
import Page2 from './conponent/page2/page2';

import './App.scss';
import { connect } from 'react-redux';

export const textContext = createContext("");

const App = () => {
  return (
    <BrowserRouter>
      <Link to={'/page1'} className='link'>
        顔文字
      </Link>
      <Link to={'/page2'} className='link'>
        Redux テスト
      </Link>
      <div>------------------------------------</div>
      <Switch>
        <Route path={'/page1'} component={Page1} />
        <Route path={'/page2'} component={Page2} />
      </Switch>
    </BrowserRouter>
  )
}

export default connect(state => state)(App);