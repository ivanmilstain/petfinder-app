import {insertAlert, fetchAlerts, deleteAlert} from '../db';

import Visualization from '../models/Visualization';

export const ADD_VISUALIZATION = 'ADD_VISUALIZATION';
export const LOAD_VISUALIZATIONS = 'LOAD_VISUALIZATIONS';
export const DELETE_VISUALIZATION = 'DELETE_VISUALIZATION';
export const SET_FILTER = 'SET_FILTER';

export const addVisualization = (model) => {
    return async dispatch => {
        try {
            console.log(model)
            await insertAlert(model);

            dispatch({type: ADD_VISUALIZATION, model: model})
        }catch(err) {
            throw err;
        }
    }
}

export const loadVisualizations = (model) => {
    return async dispatch => {
        try {
            console.log(model)
            const result = await fetchAlerts();
            let visualizations = [];
            result.forEach(function(childSnapshot){
                const item = childSnapshot.toJSON()
                const visualization = new Visualization(
                    childSnapshot.key,
                    item.type,
                    item.color,
                    item.gender,
                    item.age,
                    item.size,
                    item.hair,
                    item.collar,
                    item.lat,
                    item.lng,
                    item.date
                )
                visualizations.push(visualization)
            })
            
            let filteredPVisualizations = visualizations.filter(function(item) {
                let show = true;
                if (model) {
                    if (model.type && item.type !== model.type) return false;
                    if (model.gender && item.gender !== model.gender) return false;
                    if (model.age && item.age !== model.age) return false;
                    if (model.size && item.size !== model.size) return false;
                    if (model.hair && item.hair !== model.hair) return false;
                    if (model.collar && item.collar !== model.collar) return false;
                    if (model.color && model.color.length > 0 && item.color) {
                        return JSON.stringify(item.color).includes(model.color);
                    };
                }
                
                return show;
            })

            dispatch({type: LOAD_VISUALIZATIONS, visualizations: filteredPVisualizations });
        }catch(err) {
            throw err;
        }
    }
}

export const setFilter = (model, filtered) => {
    return async dispatch => {
        try {
            model.filtered = filtered;
            dispatch({type: SET_FILTER, model});
        } catch(err) {
            throw err;
        }
    }
}

export const deleteVisualization = (id) => {
    return async dispatch => {
        try {
            const result = await deleteAlert(id);
            dispatch({type: DELETE_VISUALIZATION, id});
        } catch(err) {
            throw err;
        }
    }
} 