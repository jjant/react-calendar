import {
	getDay,
	getMonth,
	getYear,
	subDays,
	getDaysInMonth,
	addDays,
	lastDayOfMonth
} from 'date-fns';

// Returns an array with dates of the previous month needed
// to fill up the calendar.
export const daysBefore = date => {
	const firstDayOfMonth = new Date(getYear(date), getMonth(date));

	const weekDayNumber = getDay(firstDayOfMonth);

	return range(1, weekDayNumber)
		.map(daysBeforeCount => subDays(firstDayOfMonth, daysBeforeCount))
		.reverse();
};

const DAYS_IN_WEEK = 7;
const TOTAL_DAYS_IN_CALENDAR = 6 * DAYS_IN_WEEK;

// Returns an array with dates of the following month needed
// to fill up the calendar
export const daysAfter = date => {
	const numDays = getDaysInMonth(date);

	return range(
		1,
		TOTAL_DAYS_IN_CALENDAR - numDays - daysBefore(date).length
	).map(daysAfterCount => addDays(lastDayOfMonth(date), daysAfterCount));
};
// Returns an array containing the range min..max:
// range(10, 13) = [10, 11, 12, 13]
export const range = (min, max) =>
	[...new Array(max - min + 1).keys()].map(x => x + min);
