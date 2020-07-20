import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

// import app from './app'
import user, { userEpic } from './user/duck'
// Bundling Epics
const rootEpic = combineEpics(userEpic)

// Creating Bundled Epic
const epicMiddleware = createEpicMiddleware()

// Define Middleware
const middleware = [thunk, promise, epicMiddleware]

// Define Reducers
const reducers = combineReducers({
  user,
  form: formReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store
export default createStore(
  reducers,
  composeEnhancer(applyMiddleware(...middleware))
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // {},  
)
epicMiddleware.run(rootEpic)
