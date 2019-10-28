import React, { Component } from 'react';
import ContactItem from '../components/ContactItem';
import { connect } from 'react-redux';
import { loadContact } from '../actions'

class ContactTable extends Component {

    componentDidMount() {
        this.props.loadContact();
    }

    render() {
        const nodes = this.props.contacts.map((item, index) => {
            return (<ContactItem key={index} contacts={item} index={index + 1} />)
        })
        
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Number</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {nodes}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts
})

const mapDispatchToProps = (dispatch) => ({
    loadContact: () => dispatch(loadContact())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactTable)