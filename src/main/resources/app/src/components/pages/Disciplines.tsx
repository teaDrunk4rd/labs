import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";

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
            <div>
                {!this.state.isLoaded ? <Preloader/> : <div/>}
                <div className="h3 font-weight-bold mb-3">Предметы</div>
                <table className="table table-hover">
                    <thead className="thead-dark">
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
                            <tr className={`cursor-pointer ${['5', '4', 'зачёт'].includes(discipline.grade) ? 'table-success' :
                                    discipline.grade === '3' ? 'table-warning' : ''}`}
                                key={index}
                                onClick={(e) => this.props.history.push({
                                    pathname: '/disciplines/discipline',
                                    search: `?logId=${discipline.logid}`,
                                    state: { logId: discipline.logid }
                                })}>
                                <td>{discipline.name}</td>
                                <td>{discipline.type}</td>
                                <td>{discipline.totalscores}</td>
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