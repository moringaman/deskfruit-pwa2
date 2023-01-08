import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Select, { StylesConfig } from 'react-select'
import cronUtils from '../lib/cronUtils'
import timeOptions from '../lib/timeOptions'
import { useAppDispatch } from '../app/hooks'

import {
    // deskAdded,
    desk,
    User
    // Desk,
} from '../features/desk/deskSlice'

const Schedule = ({user}:any) => {

 const { objectFromCron, cronStatement } = cronUtils
    //TODO: Get cronStatement datafrom state
const appDispatch = useAppDispatch()
    const deskState = useSelector(desk)
    const { deskId, enabled, currentUser } = deskState.desk
    // const activeUser = appState.apiDesk.users.find((el:any) => el._id === appState.apiDesk.currentUser)
    const { expression, name} = currentUser || {} as User
    console.log("EXPRESSION", expression, name, user._id)
    const [cron, setCron] = useState(`'${expression}'`)
    // get cron data from saved file put into format for render
    const cronData = objectFromCron(cron)
    console.log("CronData ", cronData)
    const { days, frequency, from, to } = cronData
    console.log("DAYS ", days)
    const [chosenDays, setChosenDays ] = useState(days)
    const [hours, setHours ] = useState({
        from: from,
        to: to
    })

    const [interval, setInterval] = useState({value: 30, label:'Every 30mins'})
    console.log('Interval ', interval)
    const dayString = chosenDays.toString().split(",")

    const schedule = cronStatement(dayString, interval.value, hours.from.trim(), hours.to.trim())
    console.log("Schedule ", schedule, dayString)
    const weekDays:string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

    //TODO: Populate state array of days based on button presses

    const timeIntervals = [
        { 'value': 15, 'label': 'Every 15mins'},
        { 'value': 30, 'label': 'Every 30mins'},
        { 'value': 45, 'label': 'Every 45mins'},
        { 'value': 60, 'label': 'Every 1hr'},
        { 'value': 120, 'label': 'Every 2hrs'},
    ]

    useEffect(() => {
        console.log("UPDATING EXP ", schedule)
        appDispatch({type: 'UPDATE_ACTIVE_SCHEDULE', value: schedule })
        setCron(schedule)
    }, [schedule])

    const handleDays = (day:string) => {
        if(chosenDays.includes(day)) {
            const daysArray = chosenDays.filter(el => el !== day)
            setChosenDays(daysArray)
            return
        }
        setChosenDays([...chosenDays, day])
    }


    const selectStyles: StylesConfig = {

        placeholder: (styles) => ({ ...styles, fontSize: 14 }),
    }
    const styles = {
        menuList: (provided:any) => ({
            ...provided,
            maxHeight: 180,
          }),
        control: (provided:any) => ({
            ...provided,
            marginLeft: 15,
            maxHeight: 35
            //  minWidth: 110,
        }),
        option: (provided:any) => ({
          ...provided,
          fontWeight:  "bold",
          color: "black",
          backgroundColor: 'white',
          fontSize: 12,
        }),
        singleValue: (provided:any) => ({
          ...provided,
          color: '#114A82',
          fontWeight: 700,
          fontSize: 14,
          marginTop: 10,
          marginLeft: 10
        }),
        placeholder: (provided:any) => ({
            ...provided,
            color: 'gray',
            fontSize: 14,
            marginTop: 10,
            marginLeft: 10
        }),

      };

  return (
      <div className="schedule-container">
          <div className="schedule-container_row">
      <p style={{fontWeight: 600}}>Week Days:</p> 
      <div className="btn-row">
      {
          [weekDays[6], ...weekDays.slice(0, -1)].map((el:string, i:number) => (
        <div 
            className={`btn day ${chosenDays.includes(el) ? 'selected' : null}`}
            key={i}
            onClick={() => {handleDays(el)}}
            >{el}
        </div>
      ))
    }
      </div>
          </div>
      <div className="schedule-container_row">
          <p style={{minWidth: '75px', fontWeight: 600}}>
              Times:
          </p>
          <div>
              <p id="start_label">start at</p>
             <Select 
                options={timeOptions} 
                styles={styles} 
                placeholder="00:00" 
                value={{value: hours.from, label: hours.from}}
                onChange={(e:any) => setHours({
                    ...hours,
                    from: e.value 
                })}
                /> 
          </div>
          <div>
              <p id="end_label">finish at</p>
             <Select
                 options={timeOptions} 
                 styles={styles}
                 placeholder="00:00" 
                 value={{value: hours.to, label:hours.to}}
                onChange={(e:any) => setHours({
                    ...hours,
                    to: e.value 
                })}
                /> 
          </div>
          </div>
        <div className="schedule-container_row">
      <p style={{fontWeight: 600, marginRight: 25}}>Interval</p> 
          <div>
              <p id="end_label">Interval</p>
                <Select
                    options={timeIntervals} 
                    styles={styles}
                    placeholder="30" 
                    value={interval}
                    onChange={(e:any) => {
                        console.log('Eventr ', e)
                        setInterval({
                        value: e.value, label: e.label 
                    })}}
                    /> 
          </div>
            </div> 
            {/* <div className="schedule-container_row">
                <div className="btn" onClick={() => handleClick(cron)}>Save</div>
            </div> */}
      </div>
  )
}


export default Schedule