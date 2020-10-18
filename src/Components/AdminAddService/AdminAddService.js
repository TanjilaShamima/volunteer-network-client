import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchEventsSuccess } from '../../Redux/VoluteerActions/VolunteerActions';

const AdminAddService = ({events, fetchEventsSuccess}) => {
    const [serviceData, setServiceData] = useState({
        title: '',
        description: '',
        date:'',
        banner: null
    })

    const handleAddService = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', serviceData.title);
        data.append('description', serviceData.description);
        data.append('date', serviceData.date);
        data.append('banner', serviceData.banner);


        fetch('https://young-sierra-43782.herokuapp.com/addService', {
            method: 'POST',
            body: data
        })
        .then(res => res.json())
        .then(resData => {
            if(resData){
                const addNewService = [...events, resData];
                fetchEventsSuccess(addNewService);
                setServiceData({
                    title: '',
                    description: '',
                    date:'',
                    banner: null
                })
            }
        })

    }
    return (
        <>  
            <Form.Group>
            <h1 className="pt-3">Add Service</h1>
            <div className="d-flex justify-content-between rounded bg-light p-2 mt-5">
                <div className="w-50 p-1">
                    <Form.Group>
                        <Form.Label>Event title</Form.Label>
                        <Form.Control onChange={(event) => {
                            const {value} = event.target;
                            setServiceData({...serviceData, title: value});
                        }} size="lg" 
                        type="text" 
                        placeholder="Event title" 
                        value={serviceData.title}/>
                    </Form.Group>
                    <br/>
                    <Form.Group >
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        onChange={(event) => {
                            const {value} = event.target;
                            setServiceData({...serviceData, description: value});
                        }}  
                        as="textarea" 
                        rows={2}  
                        placeholder="Description" 
                        value={serviceData.description}/>
                    </Form.Group>
                </div>
                <div className="w-50 p-1 ml-2">
                    <Form.Group>
                        <Form.Label>Event Date</Form.Label>
                        <TextField 
                        onChange={(event) => {
                            const {value} = event.target;
                            setServiceData({...serviceData, date: value});
                        }} 
                        fullWidth={true} 
                        type="date" 
                        variant="outlined"
                        value={serviceData.date}/>
                    </Form.Group>
                    <br/>
                    <Form.Group >
                        <Form.File onChange={(event => {
                            const bannerImage = event.target.files[0];
                            setServiceData({...serviceData, banner: bannerImage})
                        })} 
                        label="Banner" 
                        accept="image/*" />
                    </Form.Group>
                </div>
            </div>
            <div className="text-right mt-2">
                <Button onClick={handleAddService} variant="success" type="submit">Submit</Button>
            </div>
            </Form.Group>
        </>
    );
};

const mapStateToProps = state => {
    return{
        events : state.events
    }
}

const mapDispatchToProps = {
    fetchEventsSuccess : fetchEventsSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddService);