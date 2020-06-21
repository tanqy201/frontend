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
            submitted: false,
            //
            key: '',
            make: '',
            model: '',
            color: '',
            owner: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // this.props.setLoading(true);
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

    onFormSubmit(e) {
        e.preventDefault();
        this.props.setLoading(true);
        axios.post('http://'+  process.env.REACT_APP_API_HOST  +':'+ process.env.REACT_APP_API_PORT+'/cars', {
            key: this.state.key,
            make: this.state.make,
            model: this.state.model,
            color: this.state.color,
            owner: this.state.owner
        }).then(res => {
            this.props.setLoading(false);
            if (res.data.status) {
                alert(res.data.message);
                this.setState({redirect: true})
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            this.props.setLoading(false);
            alert('Something went wrong')
        });
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
                            <label htmlFor="key">key</label>
                            <input type="text" className="form-control" name="key" autoComplete="off" value={this.state.key} onChange={this.handleChange} />
                            {submitted && !key &&
                                <div className="help-block">arg1 is required</div>
                            }
                            <label htmlFor="make">make</label>
                            <input type="text" className="form-control" name="make" autoComplete="off" value={this.state.make} onChange={this.handleChange} />
                            {submitted && !make &&
                                <div className="help-block">make is required</div>
                            }
                            <label htmlFor="model">key</label>
                            <input type="text" className="form-control" name="model" autoComplete="off" value={this.state.model} onChange={this.handleChange} />
                            {submitted && !model &&
                                <div className="help-block">model is required</div>
                            }
                            <label htmlFor="color">make</label>
                            <input type="text" className="form-control" name="color" autoComplete="off" value={this.state.color} onChange={this.handleChange} />
                            {submitted && !color &&
                                <div className="help-block">color is required</div>
                            }
                            <label htmlFor="owner">make</label>
                            <input type="text" className="form-control" name="owner" autoComplete="off" value={this.state.owner} onChange={this.handleChange} />
                            {submitted && !owner &&
                                <div className="help-block">owner is required</div>
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
                                <th>Key</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Color</th>
                                <th>Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tbody}
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
export { UserPage as UserPage };