import Toggle from 'rsuite/Toggle'
import { Plus } from 'react-feather'
import moment from 'moment'

 const UserCard = (props:any) => {
    const { users, user, selected, handleChange, loading, currentUser, handleClick } = props
    // const avatar = require(user.image)
    console.log("selected", selected)
  return (
    <div className="flex flex-col items-center py-10">
        { users && users.length < 1 && <div className="h-[175px] mx-8 rounded-2xl min-w-[180px] border-white border-4 border-dashed flex justify-center items-center drop-shadow-xl"><Plus color="orange" size={68}/></div> }
        <div 
        className={` overflow-visible h-[120px] mx-6 pb-14 rounded-2xl min-w-[150px] bg-gradient-top-teal opacity-75 hover:opacity-100 flex flex-col justify-center items-center drop-shadow-xl p-2 ${currentUser === user._id ? "opacity-100 border-1 border-white": null}`}
        onClick={(e) => handleClick(e, user._id)}
        >
          <p className="text-cadet font-bold ml-2">{user.name}</p>
          <p className="text-cadet text-xs">Active: {moment(user.lastUsage).fromNow()}</p>
          <img className="rounded-full max-w-2 max-h-16 absolute -left-4 -top-8 drop-shadow-xl" src={user.image} alt="Avatar"/>
          </div>
          <Toggle 
            className="mt-2 z-1000 -translate-y-10"
            loading={loading && selected} // assign from message
            size="md"
            checkedChildren="on"
            unCheckedChildren="off"
            checked={selected} 
            disabled={user._id==="00000000000"}
            onChange={(checked, event) => {
              currentUser === user._id && handleChange(event, user._id)
            }}
    />
    </div>
  )
}


export default UserCard
