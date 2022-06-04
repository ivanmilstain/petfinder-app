import { ADD_VISUALIZATION, DELETE_VISUALIZATION, LOAD_VISUALIZATIONS, SET_FILTER } from './visualizations.action';
import Visualization from '../models/Visualization';

const initialState = {
    visualizations: [],
    filter: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_VISUALIZATION:
            const newVisualization = action.model;
            return {
                ...state,
                visualizations: state.visualizations.concat(newVisualization),
            }
        case LOAD_VISUALIZATIONS:
            return {
                ...state,
                visualizations: action.visualizations
            }
        case SET_FILTER:
            return {
                ...state,
                filter: new Visualization(
                    "",
                    action.model.type,
                    action.model.color,
                    action.model.gender,
                    action.model.age,
                    action.model.size,
                    action.model.hair,
                    action.model.collar,
                    null,
                    null,
                    null,
                    action.model.filtered
                )
            }
        case DELETE_VISUALIZATION:            
            const values = state.visualizations.filter( item => item.id !== action.id);
            return {
                ...state,
                visualizations: values,
            }
        default:
            return state
    }
}