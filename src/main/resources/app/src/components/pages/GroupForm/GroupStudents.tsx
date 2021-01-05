import React, {Component} from "react";
import axios from "axios";
import {RouteComponentProps} from 'react-router-dom';
import {getGradeBasedClassName} from "../../helpers";

interface GroupStudentsProps extends RouteComponentProps<any> {
    groupId: number
}

interface GroupStudentsState {
    students: Array<any>
}

export default class GroupStudents extends Component<GroupStudentsProps, GroupStudentsState> {
    constructor(props: GroupStudentsProps) {
        super(props);
        this.state = {
            students: []
        };
    }

    componentDidMount() {
        if (this.props.groupId !== undefined)
            axios.get(`groups/group/students?groupId=${this.props.groupId}&logId=-1`).then(response => {
                if (response.status === 200) {
                    this.setState({
                        students: response.data
                    });
                }
            });
    }

    render() {
        let {students} = this.state;
        return (
            <table className="table table-hover">
                <thead className="table-dark">
                <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {students && students.map((student, index) => {
                    return (
                        <tr className={`cursor-pointer ${getGradeBasedClassName(student.grade)}`}
                            onClick={() => this.props.history.push({
                                pathname: '/users/user',
                                search: `?id=${student.id}`,
                                state: {id: student.id}
                            })}
                            key={index}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <div className="dropdown">
                                    <div className="dots-icon" aria-expanded="false"
                                         id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"/>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                        <div className="dropdown-item"
                                             onClick={() => this.props.history.push({
                                                 pathname: '/users/user',
                                                 search: `?id=${student.id}`,
                                                 state: {id: student.id}
                                             })}>
                                            Редактировать
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    };
}