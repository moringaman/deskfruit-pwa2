import { User } from '../features/desk/deskSlice'


export const getUserList = (id:string, users: User[], update:any, data:any):User[] => {

    const currentUser = (element:any) => element._id === id
    if(users !== undefined) {
     
       let userIndex: number | undefined = users?.findIndex(currentUser) || 0
       let tmpUserArray = users.slice()
     
       let thisUser:any = {...tmpUserArray[userIndex]}
     
       thisUser = {
        ...thisUser,
        [update]: data
       } 
      tmpUserArray.splice(userIndex, 1, thisUser)
     
       console.log("******", [...tmpUserArray])

       return [...tmpUserArray]
    
  }
  return []
}