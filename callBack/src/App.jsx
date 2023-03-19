import React from "react";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			value: 0
		}
	}

	call() {
		this.setState({ value: this.state.value + 1 }, () =>
			console.log("Updated Value :" + this.state.value)
		);
	}

	render() {
		return (
			<div>
				<button onClick={() => { this.call() }}>
					Click to update state!
				</button>
			</div>
		);
	}
}

export default App;
