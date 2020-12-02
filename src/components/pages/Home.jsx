import React from 'react'
import GoogleMapReact from 'google-map-react'
import apiService from '../../services/ApiService'
import './Home.scss'

require('dotenv').config()

class Home extends React.Component {
    // Define the cordinate of Singapore and load the google map with the zoom of level 11.4
    static defaultProps = {
        center: {
            lat: 1.360270,
            lng: 103.851759
        },
        zoom: 11.4
    }

    constructor(props) {
        super(props)
        this.state = {
            dengueClusters: [],
            currentLatLng: {
                lat: 0,
                lng: 0
            },
        }
    }

    // Get the Dengue Clusters data from NEA through backend. Daily update
    getDengueClusters() {
        apiService.getDengueClusters()
            .then(response => {
                this.setState({
                    dengueClusters: response.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    showCurrentLocation = () => {

        // finding out if a system geolocation is available or not. Tested and it's available
        // if ("geolocation" in navigator) {
        //     console.log("Available")
        // } else {
        //     console.log("Not Available")
        // }

        // Using navigator.geolocation.watchPosition instead of getCurrentPosition() method so that able to get user postion when user changes location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position)
                this.setState({
                    currentLatLng: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                })

            },
                (err) => { this.setState({ errorMessage: "User denied geolocation" }) }
            )
        }
    }

    componentDidMount() {
        this.getDengueClusters()
        this.showCurrentLocation()

    }



    render() {
        // Define the Google Map API Key
        const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API

        const handleApiLoaded = (map, maps) => {

            // Draw the Dengue Cluster zone based on the Latitude and Longtitude provided
            let clustersArray = this.state.dengueClusters

            clustersArray.forEach(clusterCoords => {
                var clusters = new maps.Polygon({
                    paths: clusterCoords,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35
                });
                clusters.setMap(map);
            })

            let marker = new maps.Marker({
                position: this.state.currentLatLng,
                map,
                title: "Current Location"
            })
            marker.setMap(map)
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    {/* Important! Always set the container height explicitly */}
                    <div className="col-8 map">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: API_KEY }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                        >
                        </GoogleMapReact>

                    </div>
                </div >
            </div>

        )
    }
}

export default Home