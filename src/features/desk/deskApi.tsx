// A mock function to mimic making an async request for data

export function fetchDesk(id:string) {
 return new Promise<any>((resolve,reject) => {
  try {
    console.log('fetching data...')
    fetch(`http://localhost:3001/desks/${id}`)
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
