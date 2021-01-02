import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import StudentLogs from "../StudentLogs";
import {store} from "react-notifications-component";

interface StudentFormProps {
    location: {
        state: {
            id: number,
            logId: number
        }
    }
}

interface StudentFormState {
    email: string,
    name: string,
    group: string,
    course?: number,
    isLoaded: boolean
}

export default class StudentForm extends Component<StudentFormProps, StudentFormState> {
    private readonly StudentLogs: React.RefObject<StudentLogs>;

    constructor(props: StudentFormProps) {
        super(props);

        this.state = {
            email: '',
            name: '',
            group: '',
            course: undefined,
            isLoaded: false
        };

        this.StudentLogs = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`students/student?id=${this.props.location.state.id}`).then(response => {
            if (response.status === 200)
                this.setState({
                    email: response.data.email,
                    name: response.data.name,
                    group: response.data.group,
                    course: response.data.course,
                    isLoaded: true
                });
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        axios.put('students/student/update', {
            id: this.props.location.state.id,
            logs: this.StudentLogs.current?.state.logs
        }).then(response => {
            if (response.status === 200) {
                this.StudentLogs.current?.state.logs.forEach(l => {
                    l.grade = response.data.find((g: any) => g.logId === l.logId).grade;
                });
                this.StudentLogs.current?.forceUpdate();

                store.addNotification({
                    message: "Баллы сохранены",
                    type: "success",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });
            }
        });
    }

    render() {
        const {email, name, group, course} = this.state;
        return (
            <div className="col-md-8 m-auto mb-4">
                <div className="card text-center">
                    {!this.state.isLoaded && <Preloader className='form-loader'/>}
                    <div className="card-header">Студент группы {group} {course} курса</div>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <h5 className="card-title">Email: {email}</h5>

                        <StudentLogs ref={this.StudentLogs}
                                     studentId={this.props.location.state.id}
                                     logId={this.props.location.state.logId}/>
                         <div className="col-12 d-flex justify-content-end">
                             <button onClick={this.handleSubmit} className="btn btn-success">
                                 Сохранить
                             </button>
                         </div>
                    </div>
                </div>
            </div>
        );
    }
}
