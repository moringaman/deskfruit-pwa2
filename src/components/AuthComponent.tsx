
export default function AuthComponent(props:any) {
    const { deskID } = props

   console.log("Auth component, Desk ID ", deskID)
    const deskFound = deskID !== ""

  return (
    <div className="container mx-auto">
        <p>{deskID}</p>
    <div className="max-w-xl p-5 mx-auto my-2 bg-white rounded-md shadow-sm">
      <div className="text-center mb-6">
        <h1 className="my-3 text-3xl font-semibold text-gray-700">{!deskFound ? 'Desk Registration' :'Desk Login'}</h1>
        <p className="text-gray-400">{deskFound ? 'Enter Your Password to Sign In' : 'Enter your Email & Password to Register'}</p>
      </div>
      <div>
        <form action="" method="POST">
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600"
              >Desk Id</label
            >
            <input
              type="text"
              name="name"
              defaultValue={deskID}
              placeholder="Desk Id"
              required
              disabled
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 text-gray-400 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          {
            !deskFound && 
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600"
              >Email Address</label
            >
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              required
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          }
          <div className="mb-6">
            <label htmlFor="phone" className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="phone"
              placeholder="Password"
              required
              className="w-full px-3 py-2 placeholder-gray-300 text-gray-500 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-2 py-4 text-white bg-black rounded-md  focus:bg-indigo-600 focus:outline-none">
             { deskFound ? 'Sign In' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}
