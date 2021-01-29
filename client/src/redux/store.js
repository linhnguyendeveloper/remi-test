import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from "./RootReducer"
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const loggingMiddleware = function(store) {
//   // Called when calling applyMiddleware so
//   // our middleware can have access to the store

//   return function(next) {
//     console.log(next);
//     // next is the following action to be run
//     // after this middleware

//     return function(action) {
//       console.log(action);
//       // finally, this is where our logic lives for
//       // our middleware.
//     }
//   }
// }

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;