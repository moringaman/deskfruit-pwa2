import React, {useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  todoAdded,
  // todoToggled,
  getTodosAsync,
  todos,
  Todo,
 } from './todosSlice'


const Todos = () => {

const todoState = useAppSelector(todos)
const dispatch = useAppDispatch()
useEffect(() => {
  console.log(todoState)
}, [todoState])

const addTodo = () => {
  const newTodo:Todo = {
    id: 1,
    text: 'this is a new todo',
    completed: false
  }
  dispatch(todoAdded(newTodo))
}

return (
  <>
    <button className="group relative flex mt-5 mb-5 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    onClick={() => addTodo()}
    >
      ADD DESK
    </button>
    <p>{JSON.stringify(todoState.data)}</p>
  </>
)

}

export default Todos
