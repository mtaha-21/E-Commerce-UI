import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import {  updateUser } from "../../App/features/usersSlice";
import { FaEye } from 'react-icons/fa'

const UserEdit = () => {

    const { id } = useParams()
    const { state } = useLocation()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users } = useSelector(state => state.users )

    const [ userData, setUserData ] = useState({username: state.username, phone: state.phone, email: state.email, password: state.password,  status:state.status})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setUserData(prev => ({...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isExists = users.some(user => user.email === userData.email && user.id !== Number(id))

        if (isExists){
            toast.dismiss();
            toast.error('a user already use this email')
        } else {
            const updateData = userData;

            dispatch(updateUser({id, updateData}))
            .unwrap(unwrapResult)
            .then(res => {
                if (res.status){
                    setUserData({username: "", phone: "", email: "", password: "", userType: "admin", status:""})
                    setTimeout(()=>{
                        navigate(-1)
                    },1000)
                }
            })
        }
    }

    const [ viewPass, setViewPass ] = useState(false)

  return (
    <>
    <div className="container">
      <div className="card  my-5 mx-auto" style={{maxWidth: '500px'}}>
        <div className="card-header py-3 ">
          <h4 className="fw-bold">Edit User</h4>
        </div>
        <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
              <label
               htmlFor="username" 
               className="form-label fw-bold"
              >
                  User Name :
              </label>
              <input
               type="text" 
               id="username" 
               className="form-control" 
               placeholder="enter user name" 
               name="username" 
               value={userData.username}
               onChange={handleChange}
               required
              />
          </div>
          <div className="mb-3 mt-3">
              <label
               htmlFor="email" 
               className="form-label fw-bold"
              >
                  Email :
              </label>
              <input
               type="email" 
               id="email" 
               className="form-control" 
               placeholder="enter email" 
               name="email" 
               value={userData.email}
               onChange={handleChange}
               required
              />
          </div>
          <div className="mb-3 mt-3">
              <label
               htmlFor="phone" 
               className="form-label fw-bold"
              >
                  Phone :
              </label>
              <input
               type="number" 
               id="phone" 
               className="form-control" 
               placeholder="enter phone" 
               name="phone" 
               value={userData.phone}
               onChange={handleChange}
               required
              />
          </div>
          <div className="mb-3 mt-3">
              <label
               htmlFor="password" 
               className="form-label fw-bold"
              >
                  Password :
              </label>
              <div className="input-group">
                <input
                    type={!viewPass ? "password" : "text" }
                    id="password" 
                    className="form-control" 
                    placeholder="enter password" 
                    name="password" 
                    value={userData.password}
                    onChange={handleChange}
                    required
                />
                <button
                    className="input-group-text"
                    type="button"
                    onClick={()=> setViewPass(!viewPass)}
                >
                    <FaEye />
                </button>
              </div>
          </div>
          <div className="mb-3">
              <label
               className="form-label fw-bold" 
               htmlFor="status"
              >
                  Status :
              </label>
              <select
               className="form-select" 
               id="status"
               value={userData.status}
               name="status"
               onChange={handleChange}
               required
              >
                  <option value="">-- Select Status --</option>
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
              </select>
          </div>
          <div className="d-flex">
            <button
            type="submit" 
            className="btn btn-sm btn-primary me-2"
            >
                Update
            </button>
            <button
            type="button" 
            className="btn btn-sm btn-danger ms-2"
            onClick={()=> navigate(-1)}
            >
                Back
            </button>

          </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};

export default UserEdit;
