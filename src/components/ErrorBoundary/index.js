import React, { Component } from 'react';
import './index.css';

class ErrorBoundary extends Component {
  // Initialize state to track if an error has occurred in any child component
  state = { hasError: false };

  // React lifecycle method to update the state when an error is encountered
  static getDerivedStateFromError() {
    // Update state to indicate an error has been caught
    return { hasError: true };
  }

  // React lifecycle method to capture error details and log them
  componentDidCatch(error, errorInfo) {
    // Log the error details to the console for debugging purposes
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    // Render a fallback UI if an error was caught
    if (this.state.hasError) {
      return <h1 className="error-boundary">Something went wrong. Please try again later.</h1>;
    }

    // Render child components if no error is detected
    return this.props.children;
  }
}

export default ErrorBoundary;
