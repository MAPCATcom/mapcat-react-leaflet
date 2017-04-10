
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('app')
	);
};

render(App);

// Hot Module Replacement API
if (module && module.hot) {
	module.hot.accept('./app', () => {
		render(App)
	});
}
