import React from 'react'
import { AppRouter } from './routers/AppRouter'

import { Provider } from "react-redux";
import { store } from './store/store';

console.log(process.env.React_APP_API_URL);

const App = () => {
  return <Provider store={store}>
    <AppRouter />
  </Provider>
}

export default App
