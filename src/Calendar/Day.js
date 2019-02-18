import React from 'react';

export const Day = ({
	dayNumber,
	events,
	isCurrentMonth,
	onClick,
	onEdit,
	onDelete
}) => {
	const classes = [
		'Calendar-day',
		isCurrentMonth ? '' : 'Calendar-day-disabled'
	].join(' ');

	return (
		<div className={classes} onClick={onClick}>
			<h2 className="Calendar-day-header">{dayNumber}</h2>
			<div className="Calendar-day-events">
				{events.map((event, index) => (
					<div
						key={event.name + index}
						className={`Calendar-day-event ${event.color}`}
						onClick={e => {
							e.stopPropagation();
							onEdit(event, index);
						}}
					>
						{event.name} {event.time}
						<button
							onClick={e => {
								e.stopPropagation();
								onDelete(index);
							}}
						>
							✕
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
