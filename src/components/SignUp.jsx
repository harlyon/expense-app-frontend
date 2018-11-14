import React, {Component} from 'react';
import {Mutation} from 'react-apollo';

import NavBar from './NavBar';

// Ant Design
import {
    Input,
    Row,
    Col,
    Button,
    Layout
} from 'antd';

import SIGNUP_MUTATION from '../queries/SignUpMutation';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            gender: 'M'
        }
    }
    submitForm = ({signup}) => {
        localStorage.clear();
        localStorage.setItem('access_token', signup);
        this
            .props
            .history
            .push('/dashboard');
    }
    render() {
        const {username, password, name, email, gender} = this.state;
        return (
            <Layout className="layout">
                <NavBar/>
                <div className="wrapper center-content">
                    <Row gutter={16} className="loginForm" style={{height: 643}}>
                        <Col span={24}>
                                    <label className="inputLabel">Name</label>
                                    <Input
                                        value={name}
                                        onChange={e => this.setState({name: e.target.value})}
                                        type="text"
                                        placeholder="Enter your name"/>
                                    <label className="inputLabel">Email</label>
                                    <Input
                                        value={email}
                                        onChange={e => this.setState({email: e.target.value})}
                                        type="text"
                                        placeholder="Enter your email"/>
                                    <label className="inputLabel">Username</label>
                                    <Input
                                        value={username}
                                        onChange={e => this.setState({username: e.target.value})}
                                        type="text"
                                        placeholder="Enter your username"/>
                                    <label className="inputLabel">Password</label>
                                    <Input
                                        value={password}
                                        onChange={e => this.setState({password: e.target.value})}
                                        type="password"
                                        placeholder="Enter your password"/>
                            <label className="inputLabel">Gender:
                            </label>
                            <select
                                className="select-dropdown"
                                value={gender}
                                onChange={e => this.setState({gender: e.target.value})}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                            <Mutation
                                mutation={SIGNUP_MUTATION}
                                variables={{username,password,name,email,gender}}
                                onCompleted={data => this.submitForm(data)}>
                                {mutation => <Button type="primary" size="large" onClick={mutation}>Sign Up</Button>}
                            </Mutation>
                        </ Col>
                    </ Row>
                </div>

            </Layout>
        )
    }
}
