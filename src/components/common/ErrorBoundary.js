import { Component } from "react";

import GetBackToHome from "./GetBackToHome";

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            showGetBackToHome: false
        }
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                showGetBackToHome: true
            });
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    // static getDerivedStateFromError(error) {
    //     return { error: error.message };
    // }

    // componentDidCatch() {
    //     console.log('componentDidCatch');
    // }

    render() {
        if (this.state.error) {
            return (
                <div className="message-when-no-data">
                    <h2>ERROR: {this.state.error}</h2>
                    <h1>Returning back to Home page...</h1>
                    {this.state.showGetBackToHome && <GetBackToHome error={this.state.error} />}
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
