import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'babel-polyfill';
import { userActions } from '../_actions';
import { SubmitForm, TransactionForm } from './SubmitForm';


// import {test} from '../fabric/network.js'
// let network = require('../fabric/network.js');

class IssuerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arg1: '',
            data: [],
            equity: [],
            submitted: false,
            //
            equityId: '',
            name: '',
            country: 'CANADA',
            capTable: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // this.props.setLoading(true);
        axios.get('http://localhost:3000' + '/cars/' + 'CANADA').then(res => {
            // this.props.setLoading(false);
            if (res.data.status) {
                this.setState({ equity: res.data.equity })
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            // this.props.setLoading(false);
            alert('Something went wrong')
        })
        console.log(this.state.equity)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async onFormSubmit(e) {
        e.preventDefault();
        // this.props.setLoading(true);
        await axios.post('http://localhost:3000' + '/cars/', {
            equityId: this.state.equityId,
            name: this.state.name,
            country: this.state.country
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
        axios.get('http://localhost:3000' + '/cars/CANADA').then(res => {
            // this.props.setLoading(false);
            if (res.data.status) {
                this.setState({ equity: res.data.equity })
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            // this.props.setLoading(false);
            alert('Something went wrong')
        }).then(() => {
            this.componentDidMount()
        })
        console.log(this.state.equity)
    }

    render() {
        const tbody = this.state.equity.map(equity => {
            return <tr key={equity.Key}>
                <td>{equity.Key}</td>
                <td>{equity.Record.equityId}</td>
                <td>{equity.Record.name}</td>
                <td>{equity.Record.country}</td>
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
                            <li><a href="/User">User</a></li>
                            <li class="active"><a href="/Issuer">Issuer</a></li>
                            <li><a href="/Security">Security</a></li>
                            <li><a href="/Unknown">Unknown</a></li>
                        </ul>
                        <Link to="/login">
                            <button class="btn btn-danger navbar-btn">Logout</button>
                        </Link>
                    </div>
                </nav>
                <SubmitForm
                    _equityId={this.state.equityId}
                    _name={this.state.name}
                    _country={this.state.country}
                    onFormSubmit={i => this.onFormSubmit(i)}
                    handleChange={this.handleChange}
                />
                <TransactionForm
                    equity={this.state.equity}
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
export { IssuerPage as IssuerPage };