import React from 'react'
import apiService from '../../services/ApiService'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dengueClusters: []
        }
    }

    componentDidMount() {
        this.getDengueClusters()
    }

    getDengueClusters() {
        apiService.getDengueClusters()
            .then(response => {
                this.setState({
                    dengueClusters: response.data
                })
                console.log(this.state.dengueClusters)
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div className="page-home">
                <h2>Dengue Clusters</h2>

                <div>
                    {this.state.dengueClusters.length > 0 ? (
                        <p>Dengue Clusters Map</p>

                    ) : (
                            <p>No Dengue Clusters at the moment</p>
                        )
                    }

                </div>

            </div>

        )
    }
}

export default Home