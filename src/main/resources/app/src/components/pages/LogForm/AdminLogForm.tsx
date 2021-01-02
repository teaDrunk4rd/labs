import React, {Component} from "react";
import axios from "axios";
import Preloader from "../../Preloader";
import {getGradeBasedClassName} from "../../helpers";
import {RouteComponentProps} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {store} from "react-notifications-component";

interface AdminLogFormProps extends RouteComponentProps<any> {
    logId: number
}

interface AdminLogFormState {
    discipline: any,
    disciplineType: any,
    group: any,
    teacher: any,
    disciplines: Array<any>,
    disciplineTypes: Array<any>,
    groups: Array<any>,
    teachers: Array<any>,
    students: Array<any>,
    isLoaded: boolean
}

export default class AdminLogForm extends Component<AdminLogFormProps, AdminLogFormState> {
    constructor(props: AdminLogFormProps) {
        super(props);

        this.state = {
            discipline: null,
            disciplineType: null,
            group: null,
            teacher: null,
            disciplines: [],
            disciplineTypes: [],
            groups: [],
            teachers: [],
            students: [],
            isLoaded: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.logId !== undefined)
            axios.get(`logs/log?id=${this.props.logId}`).then(logResponse => {
                if (logResponse.status === 200) {
                    this.setState({
                        discipline: logResponse.data.discipline,
                        disciplineType: logResponse.data.disciplineType,
                        group: logResponse.data.group,
                        teacher: logResponse.data.teacher
                    });
                    axios.get(`students?logId=${this.props.logId}`).then(studentsResponse => {
                        if (studentsResponse.status === 200) {
                            this.setState({
                                students: studentsResponse.data
                            });
                        }
                    });
                }
            });

        axios.get('disciplines').then(disciplinesResponse => {
            if (disciplinesResponse.status === 200) {
                axios.get('disciplineTypes').then(disciplineTypesResponse => {
                    if (disciplineTypesResponse.status === 200) {
                        axios.get('groups').then(groupsResponse => {
                            if (groupsResponse.status === 200) {
                                axios.get('teachers').then(teachersResponse => {
                                    if (teachersResponse.status === 200) {
                                        this.setState({
                                            disciplines: disciplinesResponse.data,
                                            disciplineTypes: disciplineTypesResponse.data,
                                            groups: groupsResponse.data,
                                            teachers: teachersResponse.data,
                                            isLoaded: true  // ¯\_(ツ)_/¯
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    changeGroup(id: any) {
        this.setState({
            group: this.state.groups.find(function (r) {
                return r.id === id;
            })
        });
        axios.get(`groups/group/students?groupId=${id}&logId=${this.props.logId || -1}`).then(studentsResponse => {
            if (studentsResponse.status === 200) {
                this.setState({
                    students: studentsResponse.data
                });
            }
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.props.logId !== undefined)
            axios.put('logs/log/update', {
                id: this.props.logId,
                disciplineId: this.state.discipline?.id,
                disciplineTypeId: this.state.disciplineType?.id,
                groupId: this.state.group?.id,
                teacherId: this.state.teacher?.id,
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Изменения сохранены",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/logs'})
                }
            });
        else
            axios.post('logs/log/create', {
                id: this.props.logId,
                disciplineId: this.state.discipline?.id,
                disciplineTypeId: this.state.disciplineType?.id,
                groupId: this.state.group?.id,
                teacherId: this.state.teacher?.id,
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Журнал создан",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/logs'})
                }
            });
    }

    render() {
        let {discipline, disciplineType, group, teacher, disciplines, disciplineTypes, groups, teachers, students} =
            this.state;
        return (
            <div className="col-10 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded && <Preloader className='form-loader'/>}
                    <div className="card-header">Журнал</div>
                    <div className="card-body">
                        <div className="row mb-2">
                            <label className="offset-md-2 col-md-6 col-form-label d-flex justify-content-start">
                                Дисциплина
                            </label>
                            <label className="col-md-2 col-form-label d-flex justify-content-start">
                                Тип
                            </label>

                            <div className="offset-md-2 col-md-6 mt-1">
                                <FormControl variant="outlined" className="w-100">
                                    <Select value={discipline?.id || 0}
                                            onChange={event => {
                                                this.setState({
                                                    discipline: disciplines.find(function (r) {
                                                        return r.id === event.target.value;
                                                    })
                                                })
                                            }}
                                            className="pt-1 text-start padding-bottom-1px">
                                        {disciplines.length !== 0 && disciplines.map((discipline, index) => {
                                            return (<MenuItem key={index} value={discipline.id}>{discipline.name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-2 mt-1">
                                <FormControl variant="outlined" className="w-100">
                                    <Select value={disciplineType?.id || 0}
                                            onChange={event => {
                                                this.setState({
                                                    disciplineType: disciplineTypes.find(function (r) {
                                                        return r.id === event.target.value;
                                                    })
                                                })
                                            }}
                                            className="pt-1 text-start padding-bottom-1px">
                                        {disciplineTypes.length !== 0 && disciplineTypes.map((disciplineType, index) => {
                                            return (<MenuItem key={index} value={disciplineType.id}>{disciplineType.name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="offset-md-2 col-md-4 col-form-label d-flex justify-content-start">
                                Группа
                            </label>
                            <label className="col-md-4 col-form-label d-flex justify-content-start">
                                Преподаватель
                            </label>

                            <div className="offset-md-2 col-md-4 mt-1">
                                <FormControl variant="outlined" className="w-100">
                                    <Select value={group?.id || 0}
                                            onChange={event => {
                                                this.changeGroup(event.target.value);
                                            }}
                                            className="pt-1 text-start padding-bottom-1px">
                                        {groups.length !== 0 && groups.map((group, index) => {
                                            return (<MenuItem key={index} value={group.id}>
                                                {group.name} ({group.direction.name})
                                            </MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-4 mt-1">
                                <FormControl variant="outlined" className="w-100">
                                    <Select value={teacher?.id || 0}
                                            onChange={event => {
                                                this.setState({
                                                    teacher: teachers.find(function (r) {
                                                        return r.id === event.target.value;
                                                    })
                                                })
                                            }}
                                            className="pt-1 text-start padding-bottom-1px">
                                        {teachers.length !== 0 && teachers.map((discipline, index) => {
                                            return (<MenuItem key={index} value={discipline.id}>{discipline.name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <label className="offset-md-2 col-md-6 col-form-label d-flex justify-content-start">
                            Студенты
                        </label>
                        <div className="offset-md-2 col-md-8">
                            <table className="table table-hover">
                                <thead className="table-dark">
                                <tr>
                                    <th>Имя</th>
                                    <th>Email</th>
                                    <th>Баллы</th>
                                    <th>Оценка</th>
                                </tr>
                                </thead>
                                <tbody>
                                {students && students.map((student, index) => {
                                    return (
                                        <tr className={`cursor-pointer ${getGradeBasedClassName(student.grade)}`}
                                            onClick={() => this.props.history.push({
                                                // TODO: adminUserForm
                                            })}
                                            key={index}>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.scores !== undefined ? student.scores : '-'}</td>
                                            <td>{student.grade || '-'}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>

                        <div className="offset-md-2 col-md-8 d-flex justify-content-end">
                            <button className="btn btn-success" onClick={this.handleSubmit}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}