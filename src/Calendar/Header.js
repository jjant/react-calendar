import React from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Header = () => {
	return (
		<div className="Calendar-header">
			{daysOfWeek.map(day => (
				<div className="Calendar-header-day" key={day}>
					<h3>{day}</h3>
				</div>
			))}
		</div>
	);
};
