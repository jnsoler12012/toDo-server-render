import dataBaseConnection from '../DB/dataBaseConnection.js'
import { default as UserToDoInit } from './userToDo.model.js'
import { default as TaskInit } from './task.model.js'
import { default as CategoryInit } from './category.model.js'

const User = UserToDoInit(dataBaseConnection)
const Category = CategoryInit(dataBaseConnection)
const Task = TaskInit(dataBaseConnection)

export {
    User,
    Category,
    Task
}