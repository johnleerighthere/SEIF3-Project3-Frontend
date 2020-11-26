import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { FaEdit, FaSpinner } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SearchHistory = () => {
    const [data, setData] = useState([

        { location: "Blk 785 Yishun", RiskArea: "High Risk Area", type: "Home", id: "1" },
        { location: "Blk 233 Bishan", RiskArea: "Low Risk Area", type: "Home", id: "2" },
        { location: "Blk 111 ang mo kio", RiskArea: "Medium Risk Area", type: "Home", id: "3" },
        { location: "Blk 734 bendemeer", RiskArea: "High Risk Area", type: "Home", id: "4" },

    ])

    const [savedData, setSavedData] = useState([])

    const [newData, setNewData] = useState({ location: "Blk 785 Yishun", RiskArea: "High Risk Area", type: "Home", id: "1" })

    const netwokCall = (i) => {
        // here will be your network call for save into db
        setSavedData(
            [
                ...savedData,
                data[i]
            ]
        )
    }

    const saveDataToBackend = (i) => {
        setIsSpin(true)
        let allDataArray = JSON.parse(JSON.stringify(savedData))
        console.log("savedDate", savedData)
        console.log(i)
        allDataArray[i]["edit"] = true
        console.log("savedDate", savedData)
        setTimeout(() => {
            setSavedData(
                allDataArray
            )
            setIsSpin(false)
        }, 2000)

    }

    const [edit, setEdit] = useState(false);

    const [isSpin, setIsSpin] = useState(false)
    return (

        <>
            {isSpin && <FaSpinner />}
            {edit ? <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header style={{ fontsize: '30px' }}>

                </Card.Header>
                <Card.Body>
                    <Card.Title style={{ color: 'red' }}>
                        <MdDelete />

                    </Card.Title>

                    <Card.Text>
                        <a href="https://goo.gl/maps/uw3y78Md81Dim72H6"></a>

                        <FaEdit style={{ backgroundColor: "yellow" }} />
                    </Card.Text>
                </Card.Body>
            </Card > : <Card border="primary" style={{ width: '18rem' }}>
                    <Card.Header style={{ fontsize: '30px' }}>Home
                <Button variant="success float-right" type="submit" onClick={() => netwokCall(savedData.length)}>
                            Add New
            </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title style={{ color: 'red' }}>High Risk Area</Card.Title>
                        <Card.Text>
                            <a href="https://goo.gl/maps/uw3y78Md81Dim72H6">Blk 785 Yishun</a>
                        </Card.Text>
                    </Card.Body>
                </Card >}

            {savedData && savedData.length > 0 && savedData.map((item, i) => {
                return (
                    <>
                        {console.log(item.edit)}
                        {/* {item.edit ? <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Header style={{ fontsize: '30px' }}>

                            </Card.Header>
                            <Card.Body>
                                <Card.Title style={{ color: 'red' }}>
                                    <MdDelete />

                                </Card.Title>

                                <Card.Text>
                                    <a href="https://goo.gl/maps/uw3y78Md81Dim72H6"></a>

                                    <FaEdit style={{ backgroundColor: "yellow" }} />
                                </Card.Text>
                            </Card.Body>
                        </Card > : } */}
                        <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Header style={{ fontsize: '30px' }}>{item.type}
                                {!item.edit && <Button variant="success float-right" type="submit"
                                    onClick={() => saveDataToBackend(i)}
                                >
                                    Add New
            </Button>}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title style={{ color: 'red' }}>{item.RiskArea}
                                    {item.edit && <MdDelete />}</Card.Title>
                                <Card.Text>
                                    <a href="https://goo.gl/maps/uw3y78Md81Dim72H6">{item.location}</a>
                                    {item.edit && <FaEdit style={{ backgroundColor: "yellow" }} />}
                                </Card.Text>
                            </Card.Body>
                        </Card >
                    </>
                )
            })}

        </>
    )

}

export default SearchHistory