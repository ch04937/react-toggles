import React, { useState } from "react";
import "./App.css";

function App() {
	return (
		<div className="App">
			<h1>Toggles</h1>
			<ToggleClass />
			<ToggleFunction />
			<Dropdown />
			<ToggleRender
				render={({ isOpen, toggle }) => (
					<div>I'm render as {isOpen ? "open" : "close"}</div>
				)}
			/>
			<CheckBox />
		</div>
	);
}

const ToggleRender = ({ render }) => {
	const [isOpen, setIsOpen] = useState(true);
	const toggle = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	return (
		<div style={{ color: "red" }} onClick={toggle}>
			{render({ isOpen, toggle })}
		</div>
	);
};

// function component that toggles
const ToggleFunction = () => {
	const [isOpen, setIsOpen] = useState(true);
	const toggle = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	return <button onClick={toggle}> {isOpen ? "open" : "close"}</button>;
};
export default App;

// creating a custom hook
const useToggle = () => {
	const [isOpen, setIsOpen] = useState(true);
	const toggle = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	return [isOpen, toggle];
};
// check box component
const CheckBox = () => {
	const [isOpen, toggle] = useToggle();
	return <input type="checkbox" checked={isOpen} onClick={toggle} readOnly />;
};

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
			<div onClick={toggle}>Dropdown</div> {isOpen && <div>Dropdown</div>}
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
