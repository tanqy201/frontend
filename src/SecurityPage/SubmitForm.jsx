import React from 'react';

export class SubmitForm extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3 leftBlock">
                <h2>Transaction</h2>
                <form name="form" onSubmit={this.props.onFormSubmit.bind(this)}>
                    <div className={'form-group' + (this.props.submitted && !arg1 ? ' has-error' : '')}>
                        <label htmlFor="securityId">security name</label>
                        <input type="text" className="form-control" name="securityId" autoComplete="off" value={this.props.securityId} />
                        {this.props.submitted && !securityId &&
                            <div className="help-block">security ID is required</div>
                        }
                        <label htmlFor="issuerId">issuer name</label>
                        <input type="text" className="form-control" name="issuerId" autoComplete="off" value={this.props.issuerId} />
                        {this.props.submitted && !issuerId &&
                            <div className="help-block">issuer ID is required</div>
                        }
                        <label htmlFor="investorId">investor name</label>
                        <input type="text" className="form-control" name="investorId" autoComplete="off" value={this.props.investorId} onChange={this.props.handleChange} />
                        {this.props.submitted && !investorId &&
                            <div className="help-block">investor ID is required</div>
                        }
                        <label htmlFor="amount">amount</label>
                        <input type="text" className="form-control" name="amount" autoComplete="off" value={this.props.amount} onChange={this.props.handleChange} />
                        {this.props.submitted && !amount &&
                            <div className="help-block">amount is required</div>
                        }
                        <label htmlFor="price">price</label>
                        <input type="text" className="form-control" name="price" autoComplete="off" value={this.props.price} onChange={this.props.handleChange} />
                        {this.props.submitted && !price &&
                            <div className="help-block">price is required</div>
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
        const tbody = this.props.primaryDistribution.map(primaryDistribution => {
            return <tr key={primaryDistribution.Key}>
                <td>{primaryDistribution.Key}</td>
                <td>{primaryDistribution.Record.investorId}</td>
                <td>{primaryDistribution.Record.amount}</td>
                <td>{primaryDistribution.Record.price}</td>
                <td>{primaryDistribution.Record.distributionDate}</td>
            </tr>
        })

        return (
            <div className="col-md-6 col-md-offset-3 rightBlock">
                <h2>Output</h2>
                <table id="userTable">
                    <thead>
                        <tr>
                            <th>Security ID</th>
                            <th>Investor ID</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Distribution Date</th>
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