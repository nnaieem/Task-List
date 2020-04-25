import { combineReducers } from 'redux';
import ItemReducer from './item-reducer';

export default combineReducers(
	{
		ItemReducer: ItemReducer
	}
);