import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'babel-polyfill';
import { userActions } from '../_actions';
import { SubmitForm, TransactionForm } from './SubmitForm';


// import {test} from '../fabric/network.js'
// let network = require('../fabric/network.js');

class SecurityPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arg1: '',
            data: [],
            primaryDistribution: [],
            submitted: false,
            //
            securityId: "CommonShares-VFC",
            issuerId: "Vancouver Football Club",
            investorId: "",
            amount: "",
            price: "",
            distributionDate: "",
            //
            issuers: [],
            investors: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // this.props.setLoading(true);
        axios.get('http://localhost:3000' + '/primaryDistribution/' + '888').then(res => {
            // this.props.setLoading(false);
            if (res.data.status) {
                this.setState({ primaryDistribution: res.data.primaryDistribution })
                console.log(this.state.primaryDistribution.distributionDate)
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

    async onFormSubmit(e) {
        e.preventDefault();
        // this.props.setLoading(true);
        await axios.post('http://localhost:3000' + '/primaryDistribution/', {
            securityId: this.state.securityId,
            investorId: this.state.investorId,
            amount: this.state.amount,
            price: this.state.price,
            amount: this.state.amount,
            distributionDate: "system time"
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
        let table = document.getElementById("myTable");
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = this.state.securityId;
        cell2.innerHTML = this.state.issuerId;
        cell3.innerHTML = this.state.investorId;
        cell4.innerHTML = this.state.amount;
        cell5.innerHTML = this.state.price;
        var timestamp = Date.now();
        var d = new Date(timestamp);
        cell6.innerHTML = d;
    }

    render() {
        // const tbody = this.state.equity.map(equity => {
        //     return <tr key={equity.Key}>
        //         <td>{equity.Key}</td>
        //         <td>{equity.Record.equityId}</td>
        //         <td>{equity.Record.name}</td>
        //         <td>{equity.Record.country}</td>
        //     </tr>
        // })

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
                            <li><a href="/Issuer">Issuer</a></li>
                            <li class="active"><a href="/Security">Security</a></li>
                            <li><a href="/Unknown">Unknown</a></li>
                        </ul>
                        <Link to="/login">
                            <button class="btn btn-danger navbar-btn">Logout</button>
                        </Link>
                    </div>
                </nav>
                <SubmitForm
                    securityId={this.state.securityId}
                    investorId={this.state.investorId}
                    issuerId={this.state.issuerId}
                    amount={this.state.amount}
                    price={this.state.price}
                    onFormSubmit={i => this.onFormSubmit(i)}
                    handleChange={this.handleChange}
                />
                <div className="col-md-6 col-md-offset-3 leftBlock">
                    <table id="myTable" class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Security Name</th>
                                <th scope="col">Issuer Name</th>
                                <th scope="col">Investor Name</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Price</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
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
export { SecurityPage as SecurityPage };