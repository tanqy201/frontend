import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'babel-polyfill';
import { userActions } from '../_actions';
import { test} from './function';


// import {test} from '../fabric/network.js'
// let network = require('../fabric/network.js');

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arg1: '',
            data: [],
            cars: [],
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // this.props.setLoading(true);
        console.log(process.env.REACT_APP_API_HOST);
        console.log('http://localhost:3000'+'/cars');
        axios.get('http://localhost:3000'+'/cars').then(res => {
            // this.props.setLoading(false);
            if(res.data.status) {
                this.setState({cars: res.data.cars})
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            // this.props.setLoading(false);
            alert('Something went wrong')
        })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { arg1 } = this.state;
        const data = this.state.data;
        if (arg1) {
            this.setState({
                data: data.concat([[data.length, arg1]])
            }, ()=>{
                this.updateTable();
            });
        }
        await test();
    }

    async updateTable() {
        const data = this.state.data;
        console.log(data);
        var table = document.getElementById("userTable");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = data[data.length-1][0];
        cell2.innerHTML = data[data.length-1][1];
    }

    async test(info) {
        alert("start getting");
        return userActions.getAll();
    }

    render() {
        // const { loggingIn } = this.props;
        // const { username, password, submitted } = this.state;
        const { arg1, submitted } = this.state;
        return (
            <div>
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">
                                <img src="/img/finhavenIcon.png" width="80" class="d-inline-block align-top" />
                            </a>
                        </div>
                        <ul class="nav navbar-nav">
                            <li><a href="/">Home</a></li>
                            <li class="active"><a href="/User">User</a></li>
                            <li><a href="/Issuer">Issuer</a></li>
                            <li><a href="/Security">Security</a></li>
                            <li><a href="/Unknown">Unknown</a></li>
                        </ul>
                        <Link to="/login">
                            <button class="btn btn-danger navbar-btn">Logout</button>
                        </Link>
                    </div>
                </nav>
                <div className="col-md-6 col-md-offset-3 leftBlock">
                    <h2>Function</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !arg1 ? ' has-error' : '')}>
                            <label htmlFor="arg1">argument1</label>
                            <input type="text" className="form-control" name="arg1" autoComplete="off" value={arg1} onChange={this.handleChange} />
                            {submitted && !arg1 &&
                                <div className="help-block">arg1 is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6 col-md-offset-3 rightBlock">
                    <h2>Output</h2>
                    <table id="userTable">
                        <thead>
                            <tr>
                                <th>key</th>
                                <th>value</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// function mapState(state) {
//     const { loggingIn } = state.authentication;
//     return { loggingIn };
// }

// const actionCreators = {
//     login: userActions.login,
//     logout: userActions.logout
// };

// const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { UserPage as UserPage };