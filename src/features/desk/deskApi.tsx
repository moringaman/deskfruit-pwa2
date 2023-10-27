// A mock function to mimic making an async request for data

const BASE_API_URL = process.env.NODE_ENV === 'production' ? 'https://api.deskfruit.co.uk' :
'http://localhost:3001'

export function fetchDesk(id:string) {
 return new Promise<any>((resolve,reject) => {
  try {
    console.log('fetching data...')
    fetch(`${BASE_API_URL}'/desks/'${id}`,)
        .then(response => {
          console.log('date ', response)
          resolve(response)
          })
  }catch(err) {
    reject(err)
  }
})
  // return new Promise<{ data: Desk }>((resolve) =>
  //   setTimeout(() => resolve({ data: {id: 'ewihfienwnw', name: 'async todo', authenticated: false, users: [], position: 'down', status: 'idle'} }), 500)
  // );
}
