import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
const persistor = persistStore(store);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate
				persistor={persistor}
				loading={<div>L o a d i n g . . .</div>}>
				<Router>
					<App />
				</Router>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
