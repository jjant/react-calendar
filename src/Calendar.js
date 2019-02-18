import React from 'react';
import { getDate, getMonth, getYear, getDaysInMonth } from 'date-fns';
import { connect } from 'react-redux';
import { dateToIndex } from './state/util';
import { openModal, deleteEvent } from './state/reducer';
import { Day } from './Calendar/Day';
import { Header } from './Calendar/Header';
import { range, daysBefore, daysAfter } from './Calendar/util';

const renderDay = ({
	key,
	day,
	isCurrentMonth,
	events = [],
	onDelete = () => {},
	onEdit = () => {},
	onClick = () => {}
}) => {
	return (
		<Day
			events={events}
			dayNumber={day}
			key={key}
			isCurrentMonth={isCurrentMonth}
			onClick={onClick}
			onEdit={onEdit}
			onDelete={onDelete}
		/>
	);
};

const Calendar = ({ date, events, isOpen, dispatch }) => {
	const numDays = getDaysInMonth(date);
	const daysCurrentMonth = range(1, numDays);

	return (
		<React.Fragment>
			<div className="Calendar">
				<Header />
				<div className="Calendar-days">
					{daysBefore(date).map(dayBefore =>
						renderDay({
							key: dayBefore,
							day: getDate(dayBefore),
							isCurrentMonth: false
						})
					)}
					{daysCurrentMonth.map(dayNumber => {
						const thisDate = new Date(getYear(date), getMonth(date), dayNumber);
						const index = dateToIndex(thisDate);

						const eventsForDay = events[index];

						return renderDay({
							key: dayNumber,
							day: dayNumber,
							events: eventsForDay,
							isCurrentMonth: true,
							onClick: () => dispatch(openModal({ date: thisDate })),
							onEdit: (event, idx) =>
								dispatch(
									openModal({
										date: thisDate,
										editEvent: event,
										editEventIndex: idx
									})
								),
							onDelete: idx =>
								dispatch(deleteEvent({ date: thisDate, eventIndex: idx }))
						});
					})}
					{daysAfter(date).map(dayAfter =>
						renderDay({
							key: dayAfter,
							day: getDate(dayAfter),
							isCurrentMonth: false
						})
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

const ConnectedCalendar = connect(({ isModalOpen }) => ({
	isOpen: isModalOpen
}))(Calendar);

export { ConnectedCalendar as Calendar };
