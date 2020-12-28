import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import StudentLogs from "../StudentLogs";

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

    render() {
        const {email, name, group, course} = this.state;
        return (
            <div className="col-md-8 m-auto mb-4">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='form-loader' /> : <div/>}
                    <div className="card-header">Студент группы {group} {course} курса</div>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <h5 className="card-title">Email: {email}</h5>

                        <StudentLogs ref={this.StudentLogs}
                                     studentId={this.props.location.state.id}
                                     logId={this.props.location.state.logId}/>
                    </div>
                </div>
            </div>
        );
    }
}
