// import Axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    // geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './SearchBar.scss'



class SearchBarComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            area: "",
            latLng: null
        }
    }
    inputChange = (event) => {
        this.setState({ area: event.target.value });
    }
    submitData = () => {
        if (!this.state.address) {
            console.log("enter some address")
            toastr.error("Please enter an address")
            return false
        }
        if (!this.state.latLng) {
            console.log("please select a place from the suggesstions")
            toastr.error("Please select a place from the suggestions")
            return false
        }

        // this.props.onNewAddress({latLng:this.state.latLng, locationText: })
        this.props.onNewAddress({ type: "Other", latLng: this.state.latLng, locationText: this.state.address })
        this.setState({ latLng: "", address: "" })
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({ address })
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(res => this.setState({ latLng: res.lat + "," + res.lng, obj: { latLng: res.lat + "," + res.lng, riskArea: "High", location: address } }))
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <form className="form-group">
                <div className="mb-1">
                    <label id="search-label" style={{ fontWeight: 'bold', color: 'black' }}>
                        Area to check:
                        </label>
                </div>

                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className="mb-2">
                            <input className="form-group" id="search-input"
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                            />

                            <Button id="search-button" type="button" value="Submit" variant="primary" onClick={this.submitData}>Submit</Button>

                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion, i) => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            key={i}
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}


                            </div>


                        </div>
                    )}
                </PlacesAutocomplete>
            </form>

        )
    }

}

export default SearchBarComponent