import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyMiddleware } from "redux";
import { Link } from "react-router-dom";
import '../../../src/App.css'
import { deleteContacts, retrieveContacts } from "../../actions/contacts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faEye, faTrash,faHeart,faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Card,ListGroup } from 'react-bootstrap';


export const ContactListNew = (props) => {
    const contacts = useSelector((state) => state.contactReducer)
    console.log("contacts1",contacts.retreieve_data)
    console.log("contacts12",typeof(contacts))


    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const [detail, setDetail] = useState(null);

    const checkLogin = () => {
        const getToken = JSON.parse(localStorage.getItem("user_data"));
        setIsLogin(getToken ? true : false)
    }

    useEffect(() => {
        checkLogin();
        dispatch(retrieveContacts());
    }, []);

    const contactPage = (value) => {
        setDetail(value)

    }
    console.log("detail",detail)
    const removeContact = (value) => {
        dispatch(deleteContacts(value._id))
            .then(() => {
                props.history.push("/");
                window.location.reload();

            })
            .catch(e => {
                console.log(e);
            });
    };

    //render header
    const renderHeader = () => {
        let headerElement = ["Sn","name","email","phone","Favourite","Action"]

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    //render body
    const renderBody = () => {
        return contacts.retreieve_data && contacts.retreieve_data.map((item,index) => {
            return (
                <tr key={item._id}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    { item.isFavourite ? 
                    <td> <FontAwesomeIcon icon={faHeart} className="hover:text-red-300"></FontAwesomeIcon></td>:<td></td>
                    }
                    <td className='action'>
                        <button className='button' onClick={() => contactPage(item)}><FontAwesomeIcon icon={faEye} className="hover:text-red-300"></FontAwesomeIcon></button>
                        <button className='button'><FontAwesomeIcon icon={faPen} className="hover:text-black-300"></FontAwesomeIcon></button>
                        <button className='button'><FontAwesomeIcon icon={faTrash} className="hover:text-black-300"></FontAwesomeIcon></button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className="list row">
            <div className="col-md-10">
                <div className="contact-table d-flex justify-content-start align-items-start">

                   <h3 className="contact-add"> <Link to='/add-contact'><FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon></Link></h3>

                    <table id='contact-list'>
                        <thead>
                            <tr>{renderHeader()}</tr>
                        </thead>
                        <tbody>
                            {renderBody()}
                        </tbody>

                    </table>
                
                </div>
                
            </div>
            <div className="contact-detail col-md-2 mt-5">
                    {detail ?(
                    <Card style={{ width: '18rem',backgroundColor:"white" }}>
                        <h2 className="text-black">Detail</h2>
                        <hr className="text-black"></hr>
                        <ListGroup>
                            <ListGroup.Item>Phone:{detail.phone}</ListGroup.Item>
                            <ListGroup.Item>Email:{detail.email}</ListGroup.Item>
                            <ListGroup.Item>Name:{detail.name}</ListGroup.Item>
                            <ListGroup.Item>Address:{detail.address}</ListGroup.Item>
                        </ListGroup>
                    </Card>):(
                            <div></div>
                    )}
            </div>
        
        </div>


    );
};

