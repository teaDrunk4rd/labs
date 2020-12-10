import React, {Component} from 'react';
import Preloader from "../Preloader";
import axios from "axios";
import { DatePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";


interface CalendarProps {
    events: Array<any>,
    date: Date,
    dates: Array<any>,
    isLoaded: boolean
}

export default class Calendar extends Component<any, CalendarProps> {
    constructor(props: any) {
        super(props);

        this.state = {
            events: [],
            date: new Date(),
            dates: this.getDaysInMonth(new Date().getMonth(), new Date().getFullYear()),
            isLoaded: false
        };
    }

    componentDidMount() {
        this.updateEvents(this.state.date);
    }

    updateEvents(date: Date) {
        axios.get(`calendar?dateTimestamp=${(date.getTime() - (date.getTimezoneOffset() * 60000)) / 1000}`).then(response => {
            if (response.status === 200) {
                response.data.forEach((event: any) => event.date = new Date(event.date))
                this.setState({
                    events: response.data,
                    isLoaded: true
                });
            }
        });
    }

    getDaysInMonth(month: number, year: number): any {
        let today = new Date();

        let dates = new Array(31)
            .fill('')
            .map(function (v, i) {
                return {
                    'date': new Date(year, month, i + 1),
                    'status': year === today.getFullYear() && month === today.getMonth() && i + 1 === today.getDate()
                        ? 'current'
                        : 'active'
                }
            }).filter(v => v['date'].getMonth() === month);

        while (dates[0]['date'].getDay() !== 1) {
            let date = dates[0]['date'];
            dates.splice(0, 0, {
                'date': new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
                'status': 'inactive'
            });
        }

        while (dates[dates.length - 1]['date'].getDay() !== 0) {
            let date = dates[dates.length - 1]['date'];
            dates.push({
                'date': new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
                'status': 'inactive'
            });
        }

        return dates;
    }

    setDate(date: any) {
        this.updateEvents(date);
        this.setState({
            date: date,
            dates: this.getDaysInMonth(date.getMonth(), date.getFullYear())
        });
    }

    render() {
        return (
            <div className='d-flex flex-wrap calendar'>
                <div className="col-12 p-0 mt-2 d-flex">
                    <label className="col-form-label p-0">Дата</label>
                </div>
                <div className="col-12 p-0 mb-2 d-flex">
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                        <DatePicker
                            value={this.state.date}
                            onChange={date => this.setDate(date)}
                            openTo="month"
                            views={["year", "month"]}
                            format="MM.yyyy"
                            cancelLabel="Отмена"
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <table className='table'>
                    <thead className='calendar-header'>
                    <tr>
                        <th>Пн</th>
                        <th>Вт</th>
                        <th>Ср</th>
                        <th>Чт</th>
                        <th>Пт</th>
                        <th>Сб</th>
                        <th>Вс</th>
                    </tr>
                    </thead>
                </table>
                {this.state.dates && this.state.dates.map((date, index) => {
                    return (
                        <div className='calendar-item d-flex align-items-stretch px-1' key={index}>
                            <div className={`card w-100 
                                ${date['status'] === 'inactive' ? 'inactive-card' :
                                date['status'] === 'current' ? 'bg-primary text-white' : ''}`
                            }>
                                <div className='card-body'>
                                    <div className='card-title h5 font-weight-normal'>{date['date'].getDate()}</div>
                                    {date['status'] !== 'inactive' && this.state.events.filter(event =>
                                        event.date.getTime() === date['date'].getTime()
                                    ).map((event, eventIndex) => {
                                        return (
                                            <div key={index + '' + eventIndex}
                                                  className={`card-text row p-0 pl-2 mb-2
                                                ${date['status'] !== 'current' ? 'text-dark' : 'text-white'}`}
                                                 data-toggle="tooltip"
                                                  title={`${event.discipline}: ${event.name}`}>
                                                <div className={`event-name 
                                                    ${JSON.parse(localStorage["user"])["role"] !== "ROLE_STUDENT" ? '' :
                                                    event.completed === true ? 'text-success' : 
                                                    event.date.getTime() < new Date().getTime() ? 'text-danger' : '' }`}>
                                                    {event.name}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {!this.state.isLoaded ? <Preloader /> : <div/>}
            </div>
        );
    }
}
