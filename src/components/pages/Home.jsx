import React from 'react'
import { Map, Marker, Circle, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react'
import apiService from '../../services/ApiService'
import SearchBarComponent from '../SearchBar'
import './Home.scss'

require('dotenv').config()

class Home extends React.Component {

    // Define the cordinate of Singapore and load the google map with the zoom of level 11.4
    static defaultProps = {
        center: {
            lat: 1.360270,
            lng: 103.851759
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            currentLatLng: this.props.center,
            dengueClusters: [],
            zoom: 11.5
        }
    }

    getCurrentLocation = () => {
        // finding out if a system geolocation is available or not. Tested and it's available
        // if ("geolocation" in navigator) {
        //     console.log("Available")
        // } else {
        //     console.log("Not Available")
        // }

        // Using navigator.geolocation.watchPosition instead of getCurrentPosition() method so that able to get user postion when user changes location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                this.setState({
                    currentLatLng: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                })

            },
                (err) => {
                    this.setState({
                        errorMessage: "User denied geolocation",
                        currentLatLng: {
                            lat: this.props.center.lat,
                            lng: this.props.center.lng,
                        }
                    })
                }
            )
        } else {
            this.setState({
                errorMessage: "Geolocation unavailable",
                currentLatLng: {
                    lat: this.props.center.lat,
                    lng: this.props.center.lng,
                }
            })
        }
    }

    // Get the Dengue Clusters data from NEA through backend. Daily update
    getDengueClusters() {
        apiService.getDengueClusters()
            .then(response => {
                const clustersData = response.data
                const dengueClusters = []

                clustersData.forEach(cluster => {
                    dengueClusters.push(cluster.coordsArr)
                })

                this.setState({
                    dengueClusters: dengueClusters
                })

            })
            .catch(err => {
                console.log(err)
            })
    }

    handleNewAddress = (addressValue) => {
        const searchPosition = addressValue.split(',')
        this.setState({
            currentLatLng: {
                lat: Number(searchPosition[0]),
                lng: Number(searchPosition[1]),
            },
            zoom: 15.5,
        })
    }

    componentDidMount() {
        this.getDengueClusters()
    }

    render() {

        this.getCurrentLocation()

        const handleApiLoaded = this.state.dengueClusters

        return (
            <div className="container main-home-container">
                <div className="row">
                    {/* Important! Always set the container height explicitly */}
                    <div className="col-8">
                        <div className="map">
                            <Map
                                google={this.props.google}
                                initialCenter={this.props.center}
                                zoom={this.state.zoom}
                                center={this.state.currentLatLng}
                                scrollwheel={true}
                            >

                                <Marker
                                    position={this.state.currentLatLng}
                                    onMouseover={this.onMouseoverMarker}
                                    name={'Current location'}
                                />

                                <Polygon
                                    paths={handleApiLoaded}
                                    strokeColor="#FF0000"
                                    strokeOpacity={0.8}
                                    strokeWeight={2}
                                    fillColor="#FF0000"
                                    fillOpacity={0.35}
                                />

                                <Circle
                                    radius={150}
                                    center={this.state.currentLatLng}
                                    onMouseover={() => console.log('mouseover')}
                                    onClick={() => console.log('click')}
                                    onMouseout={() => console.log('mouseout')}
                                    strokeColor='#0000FF'
                                    strokeOpacity={0.9}
                                    strokeWeight={2}
                                    fillColor='#0000FF'
                                    fillOpacity={0.2}
                                />
                            </Map>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8 search-bar">
                        <SearchBarComponent onNewAddress={this.handleNewAddress} />
                    </div>
                </div>
            </div>


        );
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAP_API)
})(Home)