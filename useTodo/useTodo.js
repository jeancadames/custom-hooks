import { useReducer, useEffect } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";


export const useTodo = () => {

    const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
    }

    const handleNewTodo = (todo) => {
        const action ={
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Delete Todo',
            payload: id 

        })
    }
    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    const initialState = [];

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos])

    return {
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo=>!todo.done).length
    }
}