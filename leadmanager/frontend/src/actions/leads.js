import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_LEADS, DELETE_LEADS, ADD_LEAD } from './types';

// GET LEADS
export const getLeads = () => dispatch => {
    // console.log("action getLeads");

    axios.get('/api/leads/')
        .then((res) => {
            dispatch({
                type: GET_LEADS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE LEADS
export const deleteLeads = (id) => dispatch => {
    console.log("action deleteLeads");
    axios.delete(`/api/leads/${id}/`)
        .then((res) => {
            dispatch(createMessage({ deleteLead: "Lead Deleted" }));
            dispatch({
                type: DELETE_LEADS,
                payload: id,
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD_LEAD
export const addLead = (lead) => dispatch => {

    axios.post('/api/leads/', lead)
        .then((res) => {
            dispatch(createMessage({ addLead: "Lead Added" }));

            dispatch({
                type: ADD_LEAD,
                payload: res.data,
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

