import React, { Component } from 'react';
import { connect } from "react-redux";
import { searchContact, searchReset } from "../actions";

class SearchContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleResetSearch = this.handleResetSearch.bind(this);
    }

    handleValueChange(event) {
        let value = event.target.value;
        this.setState({ value });
        this.props.searchContact(value);
    }

    handleResetSearch(event){
        event.preventDefault();
        this.setState({ value: '' });
        this.props.searchReset();
    }

    render() {
        return (
            <div className="col-auto offset-4">
                <label className="sr-only" htmlFor="inlineFormInputGroup">Search ...</label>
                <div className="input-group mb-2">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inlineFormInputGroup" 
                        placeholder="Search ..." 
                        value={this.state.value}
                        onChange={this.handleValueChange}
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            {(this.state.value.length === 0) ?
                                <i className="fas fa-search"></i> :
                                <i className="fas fa-times" onClick={this.handleResetSearch}></i>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    searchContact: (value) => { dispatch(searchContact(value)) },
    searchReset: () => { dispatch(searchReset()) }
});

export default connect(
    null,
    mapDispatchToProps
)(SearchContact);