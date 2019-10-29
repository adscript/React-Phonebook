import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadContact } from '../actions'
import EditContact from './EditContact';
import ContactItem from '../containers/ContactItem';

class ContactTable extends Component {

    componentDidMount() {
        this.props.loadContact();
    }

    render() {
        const nodes = this.props.contacts.map((item, index) => {
            return (
                    item.isVisible ?
                    item.onEdit ?
                    <EditContact key={index} contacts={item} index={index + 1} /> : 
                    <ContactItem key={index} contacts={item} index={index + 1} />
                    : ''
            )
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
                <tbody className="scrollable" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
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