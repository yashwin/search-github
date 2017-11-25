import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../src/components/Main';
import './App.css';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore.jsx';

const store = configureStore();


const render = () => (
	ReactDOM.render(
		<Provider store={store}>
	    <Main />
	  </Provider>,
		document.getElementById('root')
	)
)

export default render;

if (module.hot) module.hot.accept('./components/Main', () => render(Main));
