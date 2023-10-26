
const days:string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const cronLibrary = {

 cronStatement: (chosen: string[], frequency:number, from:string, to:string):string => {
    const times = `${from}-${to}` //?
    console.log('Cron Utils', chosen) 
     const cronDays = chosen.map((el:any) => el = days.indexOf(el)).filter((el:any) => el !== '-1') 
     console.log('Cron Utils', cronDays) 
    return `'*/${frequency} ${times} * * ${cronDays.toString()}'`
},

objectFromCron: (schedule:string) => {
    console.log("I GOT ", schedule)
    const elements = schedule.split(" ")[4].toString().split(",") //?
    console.log("Replacing ", elements[elements.length-1].replace(/["'"]/g, ""))
   elements[elements.length-1] = elements[elements.length-1].replace(/["'"]/g, "")
    console.log("ELEMENTS ", elements)
    const daysPicked = elements.map((el:any) => days[el])
    const frequency = schedule.slice(3, schedule.indexOf(' ')) //?
    const from = schedule.slice(schedule.indexOf(' '), schedule.indexOf('-'))//?
    const to = schedule.slice(schedule.indexOf('-') +1, schedule.indexOf('*', 2 )) 
    console.log("TTOOOOO " , schedule, to, from, daysPicked)
     //?
    return {
        days: daysPicked,
        frequency,
        from,
        to
    } //?
}

}



export default cronLibrary