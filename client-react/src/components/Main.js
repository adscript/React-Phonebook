import React, { Component } from 'react';
import ContactTable from '../containers/ContactTable';

export default class Main extends Component {
    render() {
        return (
            <div className ="container">
                <div className ="card my-5">
                    <div className ="card-header text-center">
                        <h1>Phonebook Apps</h1>
                    </div>
                    <div className ="card-body">

                        <button type="button" className ="btn btn-outline-dark mb-4"> <i className ="fas fa-plus"></i> Add</button>

                        <ContactTable />

                    </div>
                    <div className ="card-footer text-center text-muted">
                        <i className ="far fa-copyright"></i> Adnan Radja Maulana 2019
                    </div>
                </div>
            </div>
        )
    }
}