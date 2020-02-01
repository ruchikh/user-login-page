import React, { Component } from 'react';
import { connect } from 'react-redux'

class Dashboard extends Component {
    render() {
        const { userData:{ user = [] } = {} } = this.props;

        return (
            <div>
                <table className="table-wrapper">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                        {user.map((item, i) => {
                                const {id, name, age, gender, email, phoneNo} = item;

                                return <tr key={i}>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{age}</td>
                                        <td>{gender}</td>
                                        <td>{email}</td>
                                        <td>{phoneNo}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = ({userData}) => {
    return {
        userData
    }
}

export default connect(mapStateToProps)(Dashboard);