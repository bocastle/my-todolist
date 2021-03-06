import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form'
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40','#f03e3e','#12b886', '#228ae6'];

class App extends Component {
  
  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정한다.

  state = {
    input: '',
    todos: [
      { id: 0, text: ' 리액트 준비 ', checked: false },
      { id: 1, text: ' 리액트 준비 ', checked: true },
      { id: 2, text: ' 리액트 준비 ', checked: false }
    ],
    color: '#343a40'
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input , todos, color } = this.state;
    this.setState({
      input: '', //인풋을 비우고 
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color
      })
    });
  }

  handleKeyPress = (e) => {
    //눌려진 키가 Enter 먼 handelCreate를 호출한다.
    if(e.key ==='Enter') {
      this.handleCreate();

    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    
    //파라미터로 받은 id를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; //선택한 객체

    const nextTodos = [...todos]; //배열을 복사  복사할때는 ...을 넣는건가용

    //기존의 값들을 복사하고, checked 값을 덮어쓰기

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    //slice 확인
    this.setState({
      todos: [
        ...todos.slice(0, index), 
        {
          ...selected,
          checked: !selected.checked
        },
        ...todos.slice(index + 1, todos.length)
      ]
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleSelectColor = (color) => {
    this.setState({
      color
    })
  }

  render() {
    const { input, todos, color } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={color}
        />
      )}
        palette={(
          <Palette colors={colors} selected={color} onSelect={handleSelectColor}/>
        )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
