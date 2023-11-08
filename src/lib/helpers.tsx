import { User, DIRECTION } from '../features/desk/deskSlice'

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

export function getDirection(value: string): DIRECTION| undefined {
  const enumKey = Object.keys(DIRECTION).find(
    (key) => DIRECTION[key as keyof typeof DIRECTION] === value
  );
  if (enumKey !== undefined) {
    return DIRECTION[enumKey as keyof typeof DIRECTION];
  }
  return undefined;
}