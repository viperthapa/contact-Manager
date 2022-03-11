import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../../../src/App.css'
import { deleteContacts, retrieveContacts } from "../../actions/contacts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faEye, faTrash,faHeart,faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'


export const ContactListNew = (props) => {
    const contacts = useSelector((state) => state.contactReducer)
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
    const removeContact = (value) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this contact',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'Yes!'
         }).then((result) => {
            if(result.isConfirmed){
                dispatch(deleteContacts(value._id))
                .then(() => {
                    props.history.push("/");
                    window.location.reload(true);
    
    
                })
                .catch(e => {
                    console.log(e);
                });
           }
         })            
        
    };

    //delete contact 


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
                    {/* <td>{item.phone}</td> */}
                    <td className="table-phone">{item.phone && item.phone.map((element,index) => {
                        return (
                          <span key={element._id}>
                          <p>Home: {element.home}</p>
                          <p>Work: {element.work}</p>
                          <p>Mobile: {element.mobile}</p>
                        </span>
                        )
                    })}</td>
                    { item.isFavourite ? 
                    <td> <FontAwesomeIcon icon={faHeart} style={{ marginLeft:"30px"}}></FontAwesomeIcon></td>:<td></td>
                    }
                    
                    <td className='action'>
                        <button className='button' onClick={() => contactPage(item)}><FontAwesomeIcon icon={faEye} className="hover:text-red-300"></FontAwesomeIcon></button>
                        <Link to={'/update-contact/' + item._id}><button className='button'><FontAwesomeIcon icon={faPen} className="hover:text-black-300">edit</FontAwesomeIcon></button></Link>
                        <button className='button'><FontAwesomeIcon icon={faTrash} className="hover:text-black-300"  onClick={() => removeContact(item)}></FontAwesomeIcon></button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="list row">
                <div className="col-md-9">
                    <div className="contact-table">
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
                <div className="col-md-3">
                {detail ?(
                    <div className="contact-detail">
                                <h1 className="text-black">Detail
                                { detail.isFavourite ? 
                    <FontAwesomeIcon icon={faHeart} style={{ marginLeft:"30px"}}></FontAwesomeIcon>:<p></p>
                    }</h1> 
                                
                                <hr></hr>
                                <p>
                                { detail.profile ? ( <img src={detail.profile} alt="" height={"100px"} width={"100px"} />):<p></p>}
                                </p>
                                <p>Phone{detail.phone.map((element,index) => {
                                    return (
                                    <span key={element._id} className="ml-4 pl-5">
                                        { element.home ?<p className="ml-4 pl-5">&nbsp;&nbsp;&nbsp;Home: {element.home}</p>:<p></p>}
                                        { element.work ?<p>&nbsp;&nbsp;&nbsp;work: {element.work}</p>:<p></p>}
                                        { element.mobile ?<p className="ml-4 pl-5">&nbsp;&nbsp;&nbsp;mobile: {element.mobile}</p>:<p></p>}
                                    </span>
                                    )
                                })}</p>
                                <p>Email:{detail.email}</p>
                                <p>Name:{detail.name}</p>
                                <p>Address:{detail.address}</p>
                    </div>):( <div></div>)}
                </div>
        </div>
        </div>


    );
};

