import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/app';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore'

const store = configureStore();
const ReduxApp =()=>(
    <Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent('rn_workshop_redux', () => ReduxApp);
