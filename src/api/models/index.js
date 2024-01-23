import dataBaseConnection from '../DB/dataBaseConnection.js'
import { default as UserToDoInit } from './userToDo.mode.js'


const User = UserToDoInit(dataBaseConnection)

export {
    User,
}