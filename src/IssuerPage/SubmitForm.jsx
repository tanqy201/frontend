import React from 'react';

export class SubmitForm extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3 leftBlock">
                <h2>Funtion</h2>
                <form name="form" onSubmit={this.props.onFormSubmit.bind(this)}>
                    <div className={'form-group' + (this.props.submitted && !arg1 ? ' has-error' : '')}>
                        <label htmlFor="equityId">equityId</label>
                        <input type="text" className="form-control" name="equityId" autoComplete="off" value={this.props._equityId} onChange={this.props.handleChange} />
                        {this.props.submitted && !equityId &&
                            <div className="help-block">equityId is required</div>
                        }
                        <label htmlFor="name">name</label>
                        <input type="text" className="form-control" name="name" autoComplete="off" value={this.props._name} onChange={this.props.handleChange} />
                        {this.props.submitted && !name &&
                            <div className="help-block">name is required</div>
                        }
                        <label htmlFor="country">country</label>
                        <input type="text" className="form-control" name="country" autoComplete="off" value={this.props._country} onChange={this.props.handleChange} />
                        {this.props.submitted && !country &&
                            <div className="help-block">country is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export class TransactionForm extends React.Component {

    render() {
        const tbody = this.props.equity.map(equity => {
            return <tr key={equity.Key}>
                <td>{equity.Key}</td>
                <td>{equity.Record.name}</td>
                <td>{equity.Record.country}</td>
            </tr>
        })

        return (
            <div className="col-md-6 col-md-offset-3 rightBlock">
                <h2>Output</h2>
                <table id="userTable">
                    <thead>
                        <tr>
                            <th>EquityId</th>
                            <th>Name</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </table>
            </div>
        );
    }
}