import React, {Component} from "react";
import axios from "axios";
import Preloader from "../../Preloader";
import {getGradeBasedClassName} from "../../helpers";

interface StudentLogsState {
    logs: Array<any>,
    isLoaded: boolean
}

export default class StudentLogs extends Component<any, StudentLogsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            logs: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('logs').then(response => {
            if (response.status === 200) {
                this.setState({
                    logs: response.data,
                    isLoaded: true
                })
            }
        });
    }

    render() {
        return (
            <div className="col-8 m-auto">
                {!this.state.isLoaded && <Preloader/>}
                <div className="h3 font-weight-bold mb-3">Предметы</div>
                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Наименование</th>
                        <th>Тип предмета</th>
                        <th>Кол-во баллов</th>
                        <th>Оценка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.logs.length !== 0 && this.state.logs.map((discipline, index) => {
                        return (
                            <tr className={`cursor-pointer ${getGradeBasedClassName(discipline.grade)}`}
                                key={index}
                                onClick={(e) => this.props.history.push({
                                    pathname: '/logs/log',
                                    search: `?logId=${discipline.logId}`,
                                    state: { logId: discipline.logId }
                                })}>
                                <td>{discipline.name}</td>
                                <td>{discipline.type}</td>
                                <td>{discipline.totalScores}</td>
                                <td>{discipline.grade}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    };
}