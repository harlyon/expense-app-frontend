import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

// Ant Design
import { Input, Row, Col, Button, Select } from 'antd';
const Option = Select.Option;

const SIGNUP_MUTATION = gql `
  mutation SignUpMutation($username: String!, $password: String!,$name:String!,$email:String!,$gender: String!) {
    signup(username: $username, password: $password, email: $email, name: $name, gender: $gender)
  }
`

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            gender: 'male'
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
            <div className="wrapper center-content">
                <Row gutter={16} className="loginForm">
                    <Col span={24}>
                        <Row gutter={16} >
                            <Col span={12}>
                                <label className="inputLabel">Name</label>
                                <Input
                                    value={name}
                                    onChange={e => this.setState({name: e.target.value})}
                                    type="text"
                                    placeholder="Enter your name"/>
                            </Col>
                            <Col span={12}>
                                <label className="inputLabel">Email</label>
                                <Input
                                    value={email}
                                    onChange={e => this.setState({email: e.target.value})}
                                    type="text"
                                    placeholder="Enter your email"/>
                            </Col>
                        </Row>                        
                        <Row gutter={16} >
                            <Col span={12}>
                                <label className="inputLabel">Username</label>
                                <Input
                                    value={username}
                                    onChange={e => this.setState({username: e.target.value})}
                                    type="text"
                                    placeholder="Enter your username"/>
                            </Col>
                            <Col span={12}>
                                <label className="inputLabel">Password</label>
                                <Input
                                    value={password}
                                    onChange={e => this.setState({password: e.target.value})}
                                    type="password"
                                    placeholder="Enter your password"/>
                            </Col>
                        </Row>                
                        <label className="inputLabel">Gender: </label>
                        <Select defaultValue={gender} onChange={e => this.setState({gender: e.target.value})}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                        <Mutation
                            mutation={SIGNUP_MUTATION}
                            variables={{username,password,name,email,gender}}
                            onCompleted={data => this.submitForm(data)}>
                            {mutation => <Button type="primary" size="large" onClick={mutation}>Sign Up</Button>}
                        </Mutation>
                        <span className="loginOption"> or <Link to="/login">Login</Link></span>
                    </ Col>
                </ Row>
            </div>
        )
    }
}
