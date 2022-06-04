import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// reducers
import VisualizationsReducer from './visualizations.reducer'

const RootReducer = combineReducers({
    alerts: VisualizationsReducer
})

export default createStore(RootReducer, applyMiddleware(thunk))
