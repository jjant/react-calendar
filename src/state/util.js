import { getDate, getMonth, getYear } from 'date-fns';

// Formats a date to an event-indexing string
export const dateToIndex = date =>
	toDayIndex(getDate(date), getMonth(date), getYear(date));

export const toDayIndex = (day, month, year) => `${day}-${month}-${year}`;

export const GREEN = 'Green';
export const YELLOW = 'Yellow';
export const RED = 'Red';

export const colors = [GREEN, YELLOW, RED];

// Resets the modal state
export const clearModal = state => ({
	...state,
	isModalOpen: false,
	modalDate: null,
	modalEditEvent: null
});

// Immutably change an item in a list at an index:
// updateIndex(1, 25, [2, 3, 4]) = [2, 25, 4]
export const updateIndex = (index, newElement, list) => {
	return list.map((el, idx) => (idx === index ? newElement : el));
};
