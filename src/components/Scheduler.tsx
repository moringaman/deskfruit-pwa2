import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import cronUtils from '../lib/cronUtils'
import timeOptions from '../lib/timeOptions'
//import { useAppDispatch } from '../app/hooks'
import StandardButton from '../components/ui/StandardButton'


import {
    // deskAdded,
    desk,
    User
    // Desk,
} from '../features/desk/deskSlice'

const Schedule = (props: any) => {

    const { user, saveExpression, setEditMode, loading } = props

    const { objectFromCron, cronStatement } = cronUtils
    //TODO: Get cronStatement datafrom state
    // const appDispatch = useAppDispatch()
    const deskState = useSelector(desk)
    const { currentUser } = deskState.desk
    const [users] = useState<User[] | undefined>(deskState?.desk.users)
    const currentUserData = users?.find(user => user._id === currentUser)
    // const activeUser = appState.apiDesk.users.find((el:any) => el._id === appState.apiDesk.currentUser)
    const { expression } = currentUserData || {} as User

    const [cron, setCron] = useState(`'${expression}'`)
    // get cron data from saved file put into format for render
    const cronData = objectFromCron(expression)

    const { days, from, to, frequency } = cronData

    console.log("DAAAAAAYAAA ", days)
    const [chosenDays, setChosenDays] = useState(days)
    const [hours, setHours] = useState({
        from: from,
        to: to
    })

    const timeIntervals = [
        { 'value': '15', 'label': 'Every 15mins' },
        { 'value': '30', 'label': 'Every 30mins' },
        { 'value': '45', 'label': 'Every 45mins' },
        { 'value': '60', 'label': 'Every 1hr' },
        { 'value': '120', 'label': 'Every 2hrs' },
    ]

    console.log("FREQ ", frequency)

    const label = timeIntervals.filter(el => {
        return el['value'] === frequency.toString()
    })

    console.log("LAB ", label)

    const [interval, setInterval] = useState({ value: frequency, label: label[0].label })
    const [edited, setEdited ] = useState<boolean>(false)
    const dayString = chosenDays.toString().split(",")

    const schedule = cronStatement(dayString, parseInt(interval.value), hours.from.trim(), hours.to.trim())

    const weekDays: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

    //TODO: Populate state array of days based on button presses

    useEffect(() => {
            console.log("CHOSEN ____ ", chosenDays)
    },[chosenDays])

    useEffect(() => {
        console.log("UPDATING EXP ", schedule)
        // appDispatch({ type: 'UPDATE_ACTIVE_SCHEDULE', value: schedule })
        //TODO: 
        setHours({ from: hours.from, to: hours.to })
        setCron(schedule)
    }, [schedule, interval, currentUserData])

    const handleDays = (day: string) => {
        if (chosenDays.includes(day)) {
            const daysArray = chosenDays.filter(el => el !== day)
            setChosenDays(daysArray)
            setEdited(true)
            return
        }
        setChosenDays([...chosenDays, day])
        setEdited(true)
    }

    // const selectStyles: StylesConfig = {
    //     placeholder: (styles) => ({ ...styles, fontSize: 14 }),
    // }
    const styles = {
        menuList: (provided: any) => ({
            ...provided,
            maxHeight: 180,
        }),
        control: (provided: any) => ({
            ...provided,
            marginLeft: 10,
            maxHeight: 25,
            minWidth: 100,
            maxWidth: 150,
        }),
        option: (provided: any) => ({
            ...provided,
            fontWeight: "bold",
            color: "black",
            backgroundColor: 'white',
            fontSize: 12,
            //width: 100
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#114A82',
            fontWeight: 700,
            fontSize: 12,
            marginTop: 10,
            marginLeft: 10
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: 'gray',
            fontSize: 14,
            marginTop: 10,
            marginLeft: 10
        }),

    };

    return (
        <div className="schedule-container -mt-5 w-[95%] mx-auto mb-5 overflowx-hidden">
            <div className="schedule-container_row mb-6">
                <p className="font-semibold mb-4">Set Desk Schedule</p>
                <p className="text-xs mb-3 text-gray">Pick days, times and frequency you would like
                    to change your desk position</p>
                <div className="h-[1px] w-full bg-green translate-x-[40%]" ></div>
            </div>
            <div className="schedule-container_row mt-2">
                <p className="text-xs font-bold">Week Days:</p>
                <div className="btn-row flex row mt-4 mb-5">
                    {
                        [weekDays[6], ...weekDays.slice(0, -1)].map((el: string, i: number) => (
                            <div
                                className={`btn day ${chosenDays.includes(el) ? 'selected' : null}`}
                                key={i}
                                onClick={() => { handleDays(el) }}
                            >{el}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="schedule-container_row flex grow column w-[450px]">
                <p style={{ minWidth: '70px', fontWeight: 600 }}>
                    Times:
                </p>
                <div className="z-200">
                    <p id="start_label">start at</p>
                    <Select
                        options={timeOptions}
                        styles={styles}
                        placeholder="00:00"
                        value={{ value: hours.from, label: `${hours.from}:00` }}
                        onChange={(e: any) => setHours({
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
                        value={{ value: hours.to, label: `${hours.to}:00` }}
                        onChange={(e: any) => setHours({
                            ...hours,
                            to: e.value
                        })}
                    />
                </div>
            </div>
            <div className="schedule-container_row flex row max-w-[350px] mt-5">
                <p style={{ fontWeight: 600, marginRight: 25 }}>Interval</p>
                <div>
                    <p id="end_label">Interval</p>
                    <Select
                        options={timeIntervals}
                        styles={styles}
                        placeholder="30"
                        value={interval}
                        onChange={(e: any) => {
                            console.log('Eventr ', e)
                            setEdited(true)
                            const label = timeIntervals.find(el => el.label === e.value)
                            console.log('label ', label)
                            setInterval({
                                value: e.value, label: e.label
                            })
                        }}
                    />
                </div>
            </div>
            {/* <div className="schedule-container_row">
                <div className="btn" onClick={() => handleClick(cron)}>Save</div>
            </div> */}
            <div className="mt-5 flex flex-row justify-end">
            { edited === false ? 
            <StandardButton text='Back' action={() => setEditMode(false)} />
                :
            <StandardButton text='Save' type="success" loading={loading} action={() => saveExpression(user._id, cron)} />
            }
           
            </div>
        </div>
    )
}


export default Schedule