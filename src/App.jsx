import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: [...prevState.items, newItem],
      nextItemId: prevState.nextItemId + 1
    })));
  }

  clearCompletedItems() {
    let filtered = this.state.items.filter(item => !item.isCompleted)
    this.setState((prevState => ({
      items:filtered
    })));
  }

  increaseSessionsCompleted(itemId) {
    let copy = [...this.state.items];
    for (let item of copy) {
      if (item.id === itemId) {
        item.sessionsCompleted = item.sessionsCompleted + 1;
      }
    }
    this.setState((prevState => ({
      items: copy
    })));
  }

  toggleItemIsCompleted(itemId) {
    let copy = [...this.state.items];
    for (let item of copy) {
      if (item.id === itemId) {
        item.isCompleted = !item.isCompleted;
      }
    }
    this.setState((prevState => ({
      items: copy
    })));
  }

  startSession(id) {
    this.setState((prevState => ({
      sessionIsRunning: true,
      itemIdRunning:id
    })));
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
    } = this.state;
    let areItemsMarkedAsCompleted = false;
    for (let item of this.state.items) {
      if (item.isCompleted) {
        areItemsMarkedAsCompleted=true;
      }
    }
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
          {/* TODO 4 */}
            {this.state.sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(this.state.itemIdRunning)}
              autoPlays="true"
              key={this.state.itemIdRunning}
            />}
            <div className="items-container">
              {((this.state.items.length) != 0) ? (items.map((item) => (
              	<TodoItem
              		description={item.description}
                  sessionsCompleted={item.sessionsCompleted}
                  isCompleted={item.isCompleted}
                  startSession={() => this.startSession(item.id)}
                  toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
              		key={item.id}
              	/>
            ))) : (<EmptyState />)}
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
