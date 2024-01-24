import dataBaseConnection from '../DB/dataBaseConnection.js'
import { default as UserToDoInit } from './userToDo.model.js'


const User = UserToDoInit(dataBaseConnection)

export {
    User,
}