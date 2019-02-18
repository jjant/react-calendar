import React from 'react';

export const Header = ({ month, year }) => {
	return (
		<header className="App-header">
			<h1 className="App-header-year">{month}</h1>
			<h2>{year}</h2>
		</header>
	);
};
