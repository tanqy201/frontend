import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'babel-polyfill';
import { userActions } from '../_actions';
import { test } from './function';
import { SubmitForm, TransactionForm } from './SubmitForm';


// import {test} from '../fabric/network.js'
// let network = require('../fabric/network.js');

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arg1: '',
            data: [],
            cars: [],
            submitted: false,
            //
            key: 'key',
            make: 'make',
            model: '',
            color: '',
            owner: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // this.props.setLoading(true);
        axios.get('http://localhost:3000' + '/cars').then(res => {
            // this.props.setLoading(false);
            if (res.data.status) {
                this.setState({ cars: res.data.cars })
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

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { arg1 } = this.state;
        const data = this.state.data;
        if (arg1) {
            this.setState({
                data: data.concat([[data.length, arg1]])
            }, () => {
                this.updateTable();
            });
        }
    }

    async updateTable() {
        const data = this.state.data;
        console.log(data);
        var table = document.getElementById("userTable");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = data[data.length - 1][0];
        cell2.innerHTML = data[data.length - 1][1];
    }

    alertTest() {
        alert("this is alert")
    }

    onFormSubmit(e) {
        e.preventDefault();
        // this.props.setLoading(true);
        axios.post('http://localhost:3000' + '/cars', {
            key: this.state.key,
            make: this.state.make,
            model: this.state.model,
            color: this.state.color,
            owner: this.state.owner
        }).then(res => {
            // this.props.setLoading(false);
            if (res.data.status) {
                alert(res.data.message);
                this.setState({ redirect: true })
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            // this.props.setLoading(false);
            alert('Something went wrong')
        });
        axios.get('http://localhost:3000' + '/cars').then(res => {
            // this.props.setLoading(false);
            if (res.data.status) {
                this.setState({ cars: res.data.cars })
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            // this.props.setLoading(false);
            alert('Something went wrong')
        }).then(() => {
            this.componentDidMount()
        })
        console.log(this.state.cars)
    }

    render() {
        const tbody = this.state.cars.map(car => {
            return <tr key={car.Key}>
                <td>{car.Key}</td>
                <td>{car.Record.make}</td>
                <td>{car.Record.model}</td>
                <td>{car.Record.color}</td>
                <td>{car.Record.owner}</td>

            </tr>
        })

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
                <SubmitForm
                    _key={this.state.key}
                    _make={this.state.make}
                    _model={this.state.model}
                    _color={this.state.color}
                    _owner={this.state.owner}
                    _submitted={this.state.submitted}
                    onFormSubmit={i => this.onFormSubmit(i)}
                    handleChange={this.handleChange}
                />
                <TransactionForm
                    cars={this.state.cars}
                />
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