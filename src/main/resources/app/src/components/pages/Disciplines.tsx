import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {getGradeBasedClassName} from "../../App";

interface DisciplinesState {
    disciplines: Array<any>,
    isLoaded: boolean
}

export default class Disciplines extends Component<any, DisciplinesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            disciplines: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('disciplines').then(response => {
            if (response.status === 200) {
                this.setState({
                    disciplines: response.data,
                    isLoaded: true
                })
            }
        });
    }

    render() {
        return (
            <div className="col-8 m-auto">
                {!this.state.isLoaded ? <Preloader/> : <div/>}
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
                    {this.state.disciplines.length !== 0 && this.state.disciplines.map((discipline, index) => {
                        return (
                            <tr className={`cursor-pointer ${getGradeBasedClassName(discipline.grade)}`}
                                key={index}
                                onClick={(e) => this.props.history.push({
                                    pathname: '/disciplines/discipline',
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