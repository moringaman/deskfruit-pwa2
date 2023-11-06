import Toggle from 'rsuite/Toggle'
import { Plus } from 'react-feather'


 const UserCard = (props:any) => {
    const { users, user, selected, handleChange, loading, currentUser, handleClick } = props
    // const avatar = require(user.image)
    console.log("selected", selected)
  return (
    <div className="flex flex-col items-center py-8">
        { users && users.length < 1 && <div className="h-[195px] mx-8 rounded-2xl min-w-[150px] border-white border-4 border-dashed flex justify-center items-center drop-shadow-xl"><Plus color="orange" size={68}/></div> }
        <div 
        className={` overflow-visible min-h-[160px] max-h-[120px] mx-6 pb-10 rounded-2xl min-w-[150px] bg-transparent opacity-40 hover:opacity-100 ring-2 ring-green flex flex-col justify-center items-center drop-shadow-xl p-1 ${currentUser === user._id ? "opacity-100  bg-green/[0.1] ring-2 ring-green": null}`}
        onClick={(e) => handleClick(e, user._id)}
        >
          {/* <p className="text-green font-bold ml-2">{user.name}</p> */}
          <img className="rounded-full max-w-2 max-h-17 drop-shadow-xl" src={user.image} alt="Avatar"/>
          {/* <p className="text-green text-xs -mb-1">Last Active</p> */}
          {/* <p className="text-green text-xs">{moment(user.lastUsage).fromNow()}</p> */}
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
