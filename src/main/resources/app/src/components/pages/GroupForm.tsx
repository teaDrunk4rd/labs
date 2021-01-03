import React, {Component, createRef} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {store} from "react-notifications-component";
import GroupStudents from "../GroupStudents";

interface GroupFormState {
    name: string,
    course?: number,
    direction: any,
    directions: Array<any>,
    isLoaded: boolean
}

export default class GroupForm extends Component<any, GroupFormState> {
    private readonly GroupStudents: React.RefObject<GroupStudents>;

    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            course: undefined,
            direction: null,
            directions: [],
            isLoaded: false
        };

        this.GroupStudents = createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.location.state.id !== undefined)
            axios.get(`groups/group?id=${this.props.location.state.id}`).then(response => {
                if (response.status === 200) {
                    this.setState({
                        name: response.data.name,
                        course: response.data.course,
                        direction: response.data.direction,
                        isLoaded: true
                    });
                }
            });

        axios.get('directions').then(response => {
            if (response.status === 200)
                this.setState({
                    directions: response.data,
                });
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.props.logId !== undefined)
            axios.put('groups/group/update', {
                id: this.props.location.state.id,
                name: this.state.name,
                course: this.state.course,
                directionId: this.state.direction?.id,
                studentIds: this.GroupStudents.current?.state.students.map(e => e['id'])
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Изменения сохранены",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/groups'})
                }
            });
        else
            axios.post('groups/group/create', {
                name: this.state.name,
                course: this.state.course,
                directionId: this.state.direction?.id,
                studentIds: this.GroupStudents.current?.state.students.map(e => e['id'])
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Группа создана",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/groups'})
                }
            });
    }

    render() {
        let {name, course, direction, directions} = this.state;
        return (
            <div className="col-7 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded && <Preloader className='form-loader'/>}
                    <div className="card-header">Группа</div>
                    <div className="card-body">
                        <div className="row mb-2">
                            <label className="offset-md-2 col-md-8 col-form-label d-flex justify-content-start">
                                Наименование
                            </label>

                            <div className="offset-md-2 col-md-8 mt-1">
                                <input type="text"
                                       autoComplete="false"
                                       value={name}
                                       onChange={event => this.setState({name: event.target.value})}
                                       className="form-control "/>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="offset-md-2 col-md-6 col-form-label d-flex justify-content-start">
                                Направление
                            </label>
                            <label className="col-md-2 col-form-label d-flex justify-content-start">
                                Курс
                            </label>

                            <div className="offset-md-2 col-md-6 mt-1">
                                <FormControl variant="outlined" className="w-100">
                                    <Select value={direction?.id || 0}
                                            onChange={event =>
                                                this.setState({
                                                    direction: directions.find(function (r) {
                                                        return r.id === event.target.value;
                                                    })
                                                })
                                            }
                                            className="pt-1 text-start padding-bottom-1px">
                                        {directions.length !== 0 && directions.map((direction, index) => {
                                            return (<MenuItem key={index} value={direction.id}>{direction.name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-2 mt-1">
                                <input type="number"
                                       autoComplete="false"
                                       value={course}
                                       min={1}
                                       max={4}
                                       onChange={event => this.setState({course: +event.target.value})}
                                       className="form-control"/>
                            </div>
                        </div>

                        <label className="offset-md-2 col-md-8 col-form-label d-flex justify-content-start">
                            Студенты
                        </label>
                        <div className="offset-md-2 col-md-8">
                            <GroupStudents groupId={this.props.location.state.id}
                                           ref={this.GroupStudents}
                                           history={this.props.history}
                                           location={this.props.history.location}
                                           match={this.props.match} />
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