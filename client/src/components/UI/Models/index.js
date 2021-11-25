import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



import './style.css';
import { createreview } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
const Models = (props) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [comment,setComment]=useState('');
    const [userError, setUserError] = useState({});
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { error ,success , loading , message} = useSelector((state)=>state.creview);

    const onhandleFeedback =(e)=>{
        e.preventDefault();
        const isValid = validform();
        if (isValid) {
            const submitdata ={
                name:name,
                email:email,
                description:comment
            }
            dispatch(createreview(submitdata));
        }
    }
   
    useEffect(() => {
        if(success){
            setName('');
            setEmail('');
            setComment('');
        }
      }, [success]);

    const validform = () =>{
        const userError = {}
        let isValid = true;

        if (name === '' || name === undefined || name === null) {
            userError.name = "Name can not empty";
            isValid = false;
        }
        if (email === '' || email === undefined || email === null) {
            userError.email = "Email can not empty";
            isValid = false;
        }
        if (comment === '' || comment === undefined || comment === null) {
            userError.comment = "Comment can not empty";
            isValid = false;
        }
        setUserError(userError);
        return isValid;
    }

    return (
        <>
            <div className="pop-up">
                <a id="prime" className="fab" onClick={onOpenModal}><i className="fa fa-star"></i></a>
            </div>
            <Dialog open={open} onClose={onCloseModal}>
                <DialogTitle>Feedback</DialogTitle>
                {
                    error ? <div className="alert alert-danger">{message}</div> : null
                }
                {
                    success ? <div className="alert alert-success">{message}</div> : null
                }
                <form action="" method="post" onSubmit={onhandleFeedback}>
                    <DialogContent>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" value={name} placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
                                    { userError.name ? <span className="text-dagner">{userError.name}</span> : null }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" value={email} placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                                    { userError.email ? <span className="text-dagner">{userError.email}</span> : null }
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="email">Review</label>
                                    <textarea className="form-control" maxLength="200" placeholder="Enter your feedback" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                                    { userError.comment ? <span className="text-dagner">{userError.comment}</span> : null }
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCloseModal}>Cancel</Button>
                        <Button type="submit"  color="success" variant="contained">Submit Review</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default Models;