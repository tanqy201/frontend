import React from 'react';

export class SubmitForm extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3 leftBlock">
                <h2>Funtion</h2>
                <form name="form" onSubmit={this.props.onFormSubmit.bind(this)}>
                    <div className={'form-group' + (this.props.submitted && !arg1 ? ' has-error' : '')}>
                        <label htmlFor="key">key</label>
                        <input type="text" className="form-control" name="key" autoComplete="off" value={this.props._key} onChange={this.props.handleChange} />
                        {this.props.submitted && !key &&
                            <div className="help-block">arg1 is required</div>
                        }
                        <label htmlFor="make">make</label>
                        <input type="text" className="form-control" name="make" autoComplete="off" value={this.props._make} onChange={this.props.handleChange} />
                        {this.props.submitted && !make &&
                            <div className="help-block">make is required</div>
                        }
                        <label htmlFor="model">model</label>
                        <input type="text" className="form-control" name="model" autoComplete="off" value={this.props._model} onChange={this.props.handleChange} />
                        {this.props.submitted && !model &&
                            <div className="help-block">model is required</div>
                        }
                        <label htmlFor="color">color</label>
                        <input type="text" className="form-control" name="color" autoComplete="off" value={this.props._color} onChange={this.props.handleChange} />
                        {this.props.submitted && !color &&
                            <div className="help-block">color is required</div>
                        }
                        <label htmlFor="owner">owner</label>
                        <input type="text" className="form-control" name="owner" autoComplete="off" value={this.props._owner} onChange={this.props.handleChange} />
                        {this.props.submitted && !owner &&
                            <div className="help-block">owner is required</div>
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
        const tbody = this.props.cars.map(car => {
            return <tr key={car.Key}>
                <td>{car.Key}</td>
                <td>{car.Record.make}</td>
                <td>{car.Record.model}</td>
                <td>{car.Record.color}</td>
                <td>{car.Record.owner}</td>

            </tr>
        })

        return (
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
        );
    }
}