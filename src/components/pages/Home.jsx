import React from 'react'
import GoogleMapReact from 'google-map-react'
import apiService from '../../services/ApiService'
import './Home.scss'

require('dotenv').config()

//const AnyReactComponent = ({ text }) => <div className="marker">{text}</div>;

class Home extends React.Component {
    // Define the cordinate of Singapore and load the google map with the zoom of level 11.4
    static defaultProps = {
        center: {
            lat: 1.360270,
            lng: 103.851759
        },
        zoom: 11.4
    }

    constructor() {
        super()
        this.state = {
            dengueClusters: []
        }
    }

    componentDidMount() {
        this.getDengueClusters()
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

    render() {
        // Define the Google Map API Key
        const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API

        const handleApiLoaded = (map, maps) => {

            let clustersArray = this.state.dengueClusters

            // Draw the Dengue Cluster zone based on the Latitude and Longtitude provided
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
        }


        return (
            <div className="row">
                {/* Important! Always set the container height explicitly */}
                <div className="col-8 map">
                    <h4> Dengue Clusters</h4>
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
        )
    }
}

export default Home