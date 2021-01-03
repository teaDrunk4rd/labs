import React, {Component} from 'react';
import {Collapse, Container, Navbar, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {checkRole, getUserName} from "./helpers";

interface NavMenuProps {
    collapsed?: boolean
}

export default class NavMenu extends Component<any, NavMenuProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 bg-white">
                    <Container>
                        <NavbarToggler onClick={() => this.setState({collapsed: !this.state.collapsed})} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow w-100 d-flex justify-content-between">
                                <div className="d-flex justify-content-around align-items-center">
                                    {
                                        checkRole("ROLE_TEACHER,ROLE_STUDENT") &&
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark h5 py-0 m-0 pr-2 font-weight-normal" to="/">
                                                Календарь
                                            </NavLink>
                                        </NavItem>
                                    }
                                    {
                                        checkRole("ROLE_STUDENT") &&
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark py-0" to="/disciplines">Предметы</NavLink>
                                        </NavItem>
                                    }
                                    {
                                        checkRole("ROLE_ADMIN,ROLE_TEACHER") &&
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark py-0" to="/logs">Журналы</NavLink>
                                        </NavItem>
                                    }
                                    {
                                        checkRole("ROLE_ADMIN") &&
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark py-0" to="/groups">Группы</NavLink>
                                        </NavItem>
                                    }
                                    {
                                        checkRole("ROLE_ADMIN") &&
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark py-0" to="/users">Пользователи</NavLink>
                                        </NavItem>
                                    }
                                </div>
                                <NavItem>
                                    {localStorage["user"] ? (
                                        <NavLink tag={Link} className="text-dark" to="/profile">
                                            {getUserName()}
                                        </NavLink>) : (
                                        <NavLink tag={Link} className="text-dark" to="/login">
                                            Вход
                                        </NavLink>)
                                    }
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
