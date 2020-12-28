import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";

interface DisciplinesState {
    logs: Array<any>,
    isLoaded: boolean
}

export default class Disciplines extends Component<any, DisciplinesState> {
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
                {!this.state.isLoaded ? <Preloader/> : <div/>}
                <div className="h3 font-weight-bold mb-3">Журналы</div>
                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Дисциплина</th>
                        <th>Группа</th>
                        <th>Курс</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.logs.length !== 0 && this.state.logs.map((log, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={(e) => this.props.history.push({
                                    pathname: '/logs/log',
                                    search: `?logId=${log.id}`,
                                    state: { logId: log.id }
                                })}>
                                <td>{log.discipline}</td>
                                <td>{log.group}</td>
                                <td>{log.course}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    };
}