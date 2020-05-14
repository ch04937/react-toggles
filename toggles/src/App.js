import React, { useState } from "react";
import "./App.css";

function App() {
	return (
		<div className="App">
			<h1>Toggles</h1>
			<ToggleClass />
			<ToggleFunction />
			<Dropdown />
		</div>
	);
}

// Higher Order Component
const withToggle = (Component) => {
	return () => {
		const [isOpen, setIsOpen] = useState(true);
		const toggle = () => {
			setIsOpen((isOpen) => !isOpen);
		};
		return <Component toggle={toggle} isOpen={isOpen} />;
	};
};

const DropdownViewLayer = ({ isOpen, toggle }) => {
	return (
		<>
			<div onClick={toggle}>Dropdown</div> {isOpen && <div>Dropdown</div>}{" "}
		</>
	);
};

const Dropdown = withToggle(DropdownViewLayer);
// class component that toggles
class ToggleClass extends React.Component {
	state = {
		isOpen: true,
	};
	toggle = () => {
		this.setState((state) => ({ ...state, isOpen: !state.isOpen }));
	};
	render() {
		return (
			<button onClick={this.toggle}>
				{this.state.isOpen ? "open" : "close"}
			</button>
		);
	}
}

// function component that toggles
const ToggleFunction = () => {
	const [isOpen, setIsOpen] = useState(true);
	const toggle = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	return <button onClick={toggle}> {isOpen ? "open" : "close"}</button>;
};
export default App;
