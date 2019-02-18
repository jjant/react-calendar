import { dateToIndex, clearModal, updateIndex } from './util';

const initialState = {
	isModalOpen: false,
	modalDate: null,
	modalEditEvent: null,

	// Events  are indexed by their date
	// in format 'dd-mm-yyyy'
	// I.e, { '01-00-2018': [] }
	// Represents the list of events for Jan 01 2018
	events: {}
};

// ACTIONS -- EVENT
const ADD_EVENT = 'ADD_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';
const EDIT_EVENT = 'EDIT_EVENT';

export const addEvent = ({ date, name, color, time }) => ({
	type: ADD_EVENT,
	date: dateToIndex(date),
	event: { name, color, time }
});

export const deleteEvent = ({ date, eventIndex }) => ({
	type: DELETE_EVENT,
	date: dateToIndex(date),
	eventIndex
});

export const editEvent = ({ date, name, color, time, eventIndex }) => ({
	type: EDIT_EVENT,
	date: dateToIndex(date),
	event: { name, color, time },
	eventIndex
});

// ACTIONS -- Modal
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = ({ date, editEvent, editEventIndex }) => ({
	type: OPEN_MODAL,
	date,
	editEvent,
	editEventIndex
});

export const closeModal = () => ({ type: CLOSE_MODAL });

// REDUCER
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_EVENT:
			return {
				...state,
				events: {
					...state.events,
					[action.date]: [...(state.events[action.date] || []), action.event]
				},
				isModalOpen: false
			};
		case DELETE_EVENT:
			return {
				...state,
				events: {
					...state.events,
					[action.date]: (state.events[action.date] || []).filter(
						(_, index) => index !== action.eventIndex
					)
				}
			};
		case EDIT_EVENT:
			return clearModal({
				...state,
				events: {
					...state.events,
					[action.date]: updateIndex(
						action.eventIndex,
						action.event,
						state.events[action.date] || []
					)
				}
			});
		case OPEN_MODAL:
			return {
				...state,
				isModalOpen: true,
				modalDate: action.date,
				modalEditEvent: action.editEvent,
				modalEditEventIndex: action.editEventIndex
			};
		case CLOSE_MODAL:
			return { ...state, isModalOpen: false };
		default:
			return state;
	}
};
