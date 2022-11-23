import Toggle from 'rsuite/Toggle'
import { Plus } from 'react-feather'

 const UserCard = (props:any) => {
    const { users, user, selected, handleChange, loading, currentUser, handleClick } = props
    // const avatar = require(user.image)
  return (
    <div className="flex flex-col items-center">
        { users && users.length < 1 && <div className="h-[175px] mx-8 rounded-2xl min-w-[180px] border-white border-4 border-dashed flex justify-center items-center drop-shadow-xl"><Plus color="orange" size={68}/></div> }
        <div 
        className={`h-[175px] mx-8 pb-14 rounded-2xl min-w-[180px] bg-white opacity-75 hover:opacity-100 flex flex-col justify-center items-center drop-shadow-xl p-5 ${currentUser === user._id ? "opacity-100 border-4 border-orange-300": null}`}
        onClick={(e) => handleClick(e, user._id)}
        >
          <p className="text-blue mb-2">{user.name}</p>
          <img className="rounded-full max-w-2 max-h-20 " src={user.image} alt="Avatar"/>
          </div>
          <Toggle 
            className="mt-2 z-10 -translate-y-12"
            loading={loading} // assign from message
            size="md"
            checkedChildren="enabled"
            unCheckedChildren="disabled"
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
