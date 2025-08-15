# Day 11 - React Fundamentals

## What is React?

React is a JavaScript library for building user interfaces, particularly web applications. Created by Facebook, React allows developers to create reusable UI components and manage application state efficiently. It uses a virtual DOM to optimize rendering performance and follows a component-based architecture.

## Two Main Concepts in React

### 1. Components
Reusable pieces of UI that encapsulate their own logic and rendering

### 2. Hooks
Functions that allow you to use state and other React features in functional components

## Components in React

Components are the building blocks of React applications. They are independent, reusable pieces of code that return JSX elements to be rendered to the screen.

## Three Main Concepts of Components

### 1. Props
Properties passed to components from their parent components. Props are read-only and help make components reusable.

### 2. State
Internal data that belongs to a component and can change over time. When state changes, the component re-renders.

### 3. Lifecycle
The series of methods that are called at different stages of a component's existence (mounting, updating, unmounting).

## Class Components

Class components are ES6 classes that extend `React.Component`. They must implement a `render()` method that returns JSX.

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}
```

### Key Class Component Features:

- **`this.props`**: Access to properties passed from parent components
- **`this.state`**: Access to component's internal state
- **`this.setState()`**: Method to update component state (triggers re-render)

### Class Component Lifecycle Methods:

#### `componentDidMount()`
Called immediately after the component is mounted to the DOM. Used for:
- API calls
- Setting up subscriptions
- Initializing timers

```jsx
componentDidMount() {
  // Fetch data when component mounts
  fetch('/api/data')
    .then(response => response.json())
    .then(data => this.setState({ data }));
}
```

#### `componentDidUpdate(prevProps, prevState)`
Called immediately after updating occurs. Used for:
- Making API calls based on prop/state changes
- Updating the DOM based on changes

```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevProps.userId !== this.props.userId) {
    // Fetch new user data when userId changes
    this.fetchUserData(this.props.userId);
  }
}
```

#### `componentWillUnmount()`
Called immediately before a component is unmounted and destroyed. Used for:
- Cleanup (removing event listeners, canceling network requests)
- Clearing timers

```jsx
componentWillUnmount() {
  // Clear any timers or subscriptions
  clearInterval(this.timer);
}
```

## Functional Components

Functional components are JavaScript functions that return JSX. They are simpler and more concise than class components.

```jsx
function MyComponent(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
    </div>
  );
}

// Or as arrow function
const MyComponent = (props) => {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
    </div>
  );
};
```

### Functional Components with Hooks

Functional components allow the usage of hooks - the logical units of React. This is not possible in class components.

```jsx
import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## useEffect Hook

The `useEffect` hook replaces lifecycle methods in functional components and handles side effects.

### Equivalent to `componentDidMount()`
```jsx
useEffect(() => {
  // This runs after the component mounts
  fetchData();
}, []); // Empty dependency array means it runs only once
```

### Equivalent to `componentDidUpdate()`
```jsx
useEffect(() => {
  // This runs after every render
  updateTitle();
}); // No dependency array means it runs after every render

useEffect(() => {
  // This runs only when 'count' changes
  updateTitle();
}, [count]); // Dependency array with 'count'
```

### Equivalent to `componentWillUnmount()`
```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);

  // Cleanup function (equivalent to componentWillUnmount)
  return () => {
    clearInterval(timer);
  };
}, []);
```

## React Router DOM

React Router DOM is a library for handling navigation and routing in React applications. It allows you to create single-page applications with multiple views.

### Installation
```bash
npm install react-router-dom
```

### Basic Usage
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Three Main Types of Routers

### 1. BrowserRouter
Uses the HTML5 history API to keep your UI in sync with the URL. Provides clean URLs without hash symbols.

```jsx
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Your app components */}
    </BrowserRouter>
  );
}
```

**Pros:**
- Clean URLs (e.g., `/about`, `/products/123`)
- Better for SEO
- Supports server-side rendering

**Cons:**
- Requires server configuration to handle routing
- May not work in older browsers

### 2. HashRouter
Uses the hash portion of the URL (`window.location.hash`) to keep your UI in sync with the URL.

```jsx
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      {/* Your app components */}
    </HashRouter>
  );
}
```

**Pros:**
- Works without server configuration
- Compatible with older browsers
- Good for static file hosting

**Cons:**
- URLs contain hash symbols (e.g., `/#/about`)
- Not ideal for SEO

### 3. MemoryRouter
Keeps the history of your "URL" in memory (does not read or write to the address bar).

```jsx
import { MemoryRouter } from 'react-router-dom';

function App() {
  return (
    <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
      {/* Your app components */}
    </MemoryRouter>
  );
}
```

**Use Cases:**
- Testing environments
- React Native applications
- Non-browser environments
- Embedded applications where you don't want to change the URL

**Pros:**
- Complete control over history stack
- Good for testing
- Works in non-browser environments

**Cons:**
- Users can't bookmark or share URLs
- Browser back/forward buttons don't work
- No URL synchronization