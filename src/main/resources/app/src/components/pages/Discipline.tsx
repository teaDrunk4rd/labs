import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";

function formatDate(date: string): string {
    return new Date(date).toLocaleString('ru').substr(0,10);
}

interface DisciplinesState {
    logId: number,
    discipline: string,
    type: string,
    description: string,
    teacher: string,
    labs: Array<any>,
    isLoaded: boolean
}

export default class Discipline extends Component<any, DisciplinesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            logId: props.location.state.logId,
            discipline: '',
            type: '',
            description: '',
            teacher: '',
            labs: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get(`disciplines/discipline?logId=${this.state.logId}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    discipline: response.data.name,
                    type: response.data.type,
                    description: response.data.description,
                    teacher: response.data.teacher,
                    labs: response.data.labs,
                    isLoaded: true
                })
            }
        });
    }

    render() {
        const {discipline, type, description, teacher, labs} = this.state;
        return (
            <div className="col-10 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='event-loader' /> : <div/>}
                    <div className="card-header">{discipline} ({type})</div>
                    <div className="card-body">
                        <h5 className="card-title">Ведет {teacher}</h5>
                        <h6 className="card-subtitle mb-2 col-8 mx-auto">{description}</h6>

                        <p className="card-text m-0">Лабораторные:</p>

                        <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <th>Наименование</th>
                            <th>Дата выдачи</th>
                            <th>Баллы</th>
                            <th>Дата сдачи</th>
                            <th>Полученные баллы</th>
                        </tr>
                        </thead>
                        <tbody>
                        {labs && labs.map((lab, index) => {
                            return (
                                <tr className={lab.completiondate != null ? 'table-success' :
                                                lab.issuedate != null && new Date(lab.issuedate) < new Date() ?
                                                    'table-danger': 'table-default'}
                                    key={index}>
                                    <td>{lab.name}</td>
                                    <td>{lab.issuedate != null ? formatDate(lab.issuedate) : ''}</td>
                                    <td>{lab.scores}</td>
                                    <td>{lab.completiondate != null ? formatDate(lab.completiondate) : ''}</td>
                                    <td>{lab.completionscores}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    };
}