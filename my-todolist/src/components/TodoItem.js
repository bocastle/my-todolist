import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.checked !== nextProps.checked;
    }    
    render() {
        const { text, checked, id2, onToggle, onRemove } = this.props;
        
        console.log(id2);

        return(
            <div className="todo-item" onClick={() => onToggle(id2)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation(); // onToggle 이 실행되지 않도록 합니다.
                    onRemove(id2)}
                }>&times;</div>
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">/</div>)
                }
            </div>
        );
    }
}
export default TodoItem;