var React = require('react'),
    ReactDOM = require('react-dom');

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                Hi! If you can see this text, you have set up react-express-seed correctly.
            </div>
        );
    }
}

ReactDOM.render(<MyComponent />, document.getElementById('app'));