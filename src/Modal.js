import React, { useState } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { colors, GREEN } from './state/util';
import {
	addEvent,
	editEvent as editEventAction,
	closeModal
} from './state/reducer';

const isValid = (name, time) => name !== '' && time !== '';

const formatDate = date => format(date, 'MMMM D YYYY');

const Modal = ({ date, editEvent, editEventIndex, dispatch }) => {
	const [name, setName] = useState(editEvent ? editEvent.name : '');
	const [time, setTime] = useState(editEvent ? editEvent.time : '08:00');
	const [color, setColor] = useState(editEvent ? editEvent.color : GREEN);

	const handler = editEvent ? editEventAction : addEvent;

	return (
		<div className="Modal">
			<div className="Modal-inner">
				<div className="Modal-header">
					<h2>{editEvent ? 'Edit event' : 'Add event'}</h2>
					<h2>{formatDate(date)}</h2>
				</div>
				<div className="Modal-form">
					<div className="Modal-form-field">
						<label htmlFor="name">Name</label>
						<input
							id="name"
							type="text"
							value={name}
							className="Modal-form-input"
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className="Modal-form-field">
						<label htmlFor="time">Time</label>
						<input
							id="time"
							type="time"
							value={time}
							className="Modal-form-input"
							onChange={e => setTime(e.target.value)}
						/>
					</div>
					<div className="Modal-form-field">
						<label htmlFor="color">Color</label>
						<select
							id="color"
							value={color}
							onChange={e => setColor(e.target.value)}
							className="Modal-form-input"
						>
							{colors.map(color => (
								<option key={color} value={color}>
									{color}
								</option>
							))}
						</select>
					</div>
					<div className="Modal-form-actions">
						<button
							onClick={() => dispatch(closeModal())}
							className="Modal-form-cancel"
						>
							Cancel
						</button>
						<button
							onClick={() =>
								dispatch(
									handler({
										date,
										name,
										time,
										color,
										eventIndex: editEventIndex
									})
								)
							}
							disabled={!isValid(name, time)}
							className="Modal-form-submit"
						>
							Save event
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const ConnectedModal = connect(
	({ modalDate, modalEditEvent, modalEditEventIndex }) => ({
		date: modalDate,
		editEvent: modalEditEvent,
		editEventIndex: modalEditEventIndex
	})
)(Modal);

export { ConnectedModal as Modal };
