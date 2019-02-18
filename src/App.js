import React from 'react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import './App.css';
import { Modal } from './Modal';
import { Header } from './Header';
import { Calendar } from './Calendar';

const App = ({ events, isOpen }) => {
	const date = new Date();
	const month = format(date, 'MMMM');
	const year = format(date, 'YYYY');

	return (
		<div className="App">
			{isOpen ? <Modal /> : null}
			<Header month={month} year={year} />
			<Calendar events={events} date={date} />
		</div>
	);
};

const mapStateToProps = ({ events, isModalOpen }) => ({
	events,
	isOpen: isModalOpen
});

export default connect(mapStateToProps)(App);
