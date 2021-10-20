import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from '@taquito/signer';
// import "./App.css";
import ConnectButton from "./ConnectWallet";
import DisconnectButton from "./DisconnectWallet";
import qrcode from "qrcode-generator";
import UpdateContract from "./UpdateContract";
import Transfers from "./Transfers";

import logo from '../assets/logo.svg';

import { Navbar, Nav, Row, Container, Col, Form, Button } from 'react-bootstrap';

import homeimage from '../assets/homeimage.png';
import signin from '../assets/signin.svg'

import useScript from './useScript';

import { BeaconWallet } from "@taquito/beacon-wallet";
import {
    NetworkType,
    BeaconEvent,
    defaultEventCallbacks
  } from "@airgap/beacon-sdk";
  

const ProfilePage = () => {


    // Delete Will

    const Tezos = new TezosToolkit('https://api.tez.ie/rpc/granadanet');

    const loginWallet = new BeaconWallet({
    name: 'cryptowill',
    preferredNetwork: NetworkType.GRANADANET,
    eventHandlers: {
        PERMISSION_REQUEST_SUCCESS: {
        handler: async (data: any) => {
            console.log('permission data:', data);
        },
        },
    },
    });

    Tezos.setWalletProvider(loginWallet);

  const [formData, setFormData] = useState({amount: ""})

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
    console.log(formData)

  }

  const deleteWill = (e: React.FormEvent<HTMLFormElement>) => {

    // Add popup on click to confirm/deny the delete transaction
    e.preventDefault();

    Tezos.wallet
      .at('KT1HVaSGGszQnwLmC5ehQrTF6pUtHE3zTZnF')
      .then((contract) => {
        // return contract.methods.add().send({amount: addAmount});
        return contract.methods.delWill([['unit']]).send();
      }).then((contract) => {
        return contract.confirmation()
      }).then((hash) => 
        console.log(`Operation injected: https://granada.tzstats.com/${hash}`)
      ).catch((error) => 
        console.log(`Error: ${JSON.stringify(error, null, 2)}`)
      );
  
  

    console.log('Sent call to contract, waiting for response...');
  }

  //----------------------------------------

  // Read-only storage values

//   Tezos.contract
//   .at('KT1HVaSGGszQnwLmC5ehQrTF6pUtHE3zTZnF')
//   .then((myContract) => {
//     return myContract
//       .storage()
//       .then((myStorage) => {
//         //When called on a bigMap, the get method returns a promise
//         return myStorage['thebigmap'].get({
//           0: '10', //nat
//           1: 'tz3WXYtyDUNL91qfiCJtVUX746QpNv5i5ve5', //address
//         });
//       })
//       .then((valueBigMap) => {
//         console.log(`The value associated with the specified key of the bigMap is ${valueBigMap}.`);
//       });
//   })
//   .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));

  // ------------------

    var data;

    window.onload = async function userData() {
        var contract = await Tezos.contract.at("KT1HVaSGGszQnwLmC5ehQrTF6pUtHE3zTZnF")
        var storage: {wills?: any} = await contract.storage()
        let bigMapDetail = await storage.wills.get("tz1QsX3SQiEnqLCuKV4rWbQfUT9rBzKeLkpN")

        data = bigMapDetail

        console.log(contract)
        console.log(storage)
        console.log(bigMapDetail)

        console.log(bigMapDetail.owner)
    }

    


    useScript("../vendor/@popperjs/core/dist/umd/popper.min.js");
  useScript("../vendor/bootstrap/dist/js/bootstrap.min.js");
  useScript("../vendor/onscreen/dist/on-screen.umd.min.js");
  useScript("../vendor/nouislider/distribute/nouislider.min.js");
  useScript("../vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js");
  useScript("../vendor/chartist/dist/chartist.min.js");
  useScript("../vendor/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js");
  useScript("../vendor/vanillajs-datepicker/dist/js/datepicker.min.js");
  useScript("../vendor/sweetalert2/dist/sweetalert2.all.min.js");
  useScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js");
  useScript("../vendor/vanillajs-datepicker/dist/js/datepicker.min.js");
  useScript("../vendor/notyf/notyf.min.js");
  useScript("../vendor/simplebar/dist/simplebar.min.js");
  useScript("https://buttons.github.io/buttons.js");
  useScript("../vendor/volt.js");

    return (
        <Container fluid>
            <nav id="sidebarMenu" className="sidebar d-lg-block bg-red text-white collapse" data-simplebar>
  <div className="sidebar-inner px-4 pt-3">
   
    <ul className="nav flex-column pt-3 pt-md-0">
      <li className="nav-item">
        <a href="../index.html" className="nav-link d-flex align-items-center">
          {/* <span className="sidebar-icon">
            <img src={logo} height="20" width="20" alt="Volt Logo" />
          </span> */}
          <span className="mt-1 ms-1 sidebar-text">Interact</span>
        </a>
      </li>
      <li className="nav-item active">
        <a href="/interact/add" className="nav-link">
          <span className="sidebar-icon">
            <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
          </span> 
          <span className="sidebar-text">Add funds</span>
        </a>
      </li>
      <li className="nav-item">
        <a href="/interact/withdraw" className="nav-link d-flex justify-content-between">
          <span>
            <span className="sidebar-icon">
              <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            </span>
            <span className="sidebar-text">Withdraw funds</span>
          </span>
        </a>
      </li>
      <li className="nav-item ">
        <a href="/interact/updatedays" className="nav-link">
          <span className="sidebar-icon">
            <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path></svg>
          </span>
          <span className="sidebar-text">Update No of Days</span>
        </a>
      </li>
      <li className="nav-item">
        <a href="/interact/updatesecret" className="nav-link">
          <span className="sidebar-icon">
            <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
          </span>
          <span className="sidebar-text">Update Secret Key</span>
        </a>
      </li>
      <li className="nav-item">
        <a href="/interact/updatereceiver" className="nav-link d-flex justify-content-between">
          <span>
            <span className="sidebar-icon">
              <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd"></path></svg>
            </span>
            <span className="sidebar-text">Update Receiver</span>
          </span>
        </a>
      </li>
      <li role="separator" className="dropdown-divider mt-4 mb-3 border-white"></li>
      <li className="nav-item">
        <a href="/profile" className="nav-link d-flex align-items-center">
          <span className="sidebar-icon">
            <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
          </span>
          {/* <span className="sidebar-text">Home <span className="badge badge-sm bg-secondary ms-1 text-gray-800">v1.4</span></span> */}
          <span className="sidebar-text">Profile</span>
        </a>
      </li>
      <li className="nav-item">
        <a href="/" className="nav-link d-flex align-items-center">
          <span className="sidebar-icon">
            <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
          </span>
          {/* <span className="sidebar-text">Home <span className="badge badge-sm bg-secondary ms-1 text-gray-800">v1.4</span></span> */}
          <span className="sidebar-text">Home</span>
        </a>
      </li>
    </ul>
  </div>
</nav>
<main className="content">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            </div>
            <div className="row">
                <div className="col-12 col-xl-8">
                    <div className="card card-body border-0 shadow mb-4">
                        <h2 className="h5 mb-4">General information</h2>
                        <form onSubmit={deleteWill}>
                            <div className="row">
                            {/* <div className="col-md-6 mb-3">
                        <div>
                            <label htmlFor="first_name">amount</label>
                            <input name="amount" className="form-control" id="first_name" type="text" placeholder="Amount" onChange={handleFormChange} />
                        </div>
                    </div> */}
                                <div className="col-md-6 mb-3">
                                    <div>
                                        <label htmlFor="first_name">Owner</label>
                                        {/* <input className="form-control" id="first_name" type="text" placeholder="Enter your first name" required /> */}
                                        <p className="small pe-4">{}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div>
                                        <label htmlFor="last_name">Receiver</label>
                                        {/* <input className="form-control" id="last_name" type="text" placeholder="Also your last name" required /> */}
                                        <p className="small pe-4">Get Rocket news, announcements, and product updates</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="birthday">Expiration Date</label>
                                    <div className="input-group">

                                        {/* <input data-datepicker="" className="form-control" id="birthday" type="text" placeholder="dd/mm/yyyy" required />                                                */}
                                        <p className="small pe-4">Get Rocket news, announcements, and product updates</p>
                                     </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="gender">Expiration Reset Days</label>
                                    <div className="input-group">

                                        {/* <input data-datepicker="" className="form-control" id="birthday" type="text" placeholder="dd/mm/yyyy" required />                                                */}
                                        <p className="small pe-4">Get Rocket news, announcements, and product updates</p>
                                     </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="email">Amount</label>
                                        <p className="small pe-4">Get Rocket news, announcements, and product updates</p>
                                    </div>
                                </div>
                                
                            </div>
                            
                            
                            <div className="mt-3">
                                <button className="btn btn-danger mt-2 animate-up-2" type="submit">Delete Will</button>
                            </div>
                        </form>
                    </div>


                    {/* WIP - Will add later */}

                    <div className="card card-body border-0 shadow mb-4 mb-xl-0">
                        <h2 className="h5 mb-4">Alerts & Notifications</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex align-items-center justify-content-between px-0 border-bottom">
                                <div>
                                    <h3 className="h6 mb-1">Company News</h3>
                                    <p className="small pe-4">Get Rocket news, announcements, and product updates</p>
                                </div>
                                <div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="user-notification-1" />
                                        <label className="form-check-label" htmlFor="user-notification-1"></label>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center justify-content-between px-0 border-bottom">
                                <div>
                                    <h3 className="h6 mb-1">Account Activity</h3>
                                    <p className="small pe-4">Get important notifications about you or activity you've missed</p>
                                </div>
                                <div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="user-notification-2" checked />
                                        <label className="form-check-label" htmlFor="user-notification-2"></label>
                                    </div>                                            
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                                <div>
                                    <h3 className="h6 mb-1">Meetups Near You</h3>
                                    <p className="small pe-4">Get an email when a Dribbble Meetup is posted close to my location</p>
                                </div>
                                <div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="user-notification-3" checked />
                                        <label className="form-check-label" htmlFor="user-notification-3"></label>
                                    </div> 
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-xl-4">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="card shadow border-0 text-center p-0">
                                <div className="profile-cover rounded-top" data-background="../assets/img/profile-cover.jpg"></div>
                                <div className="card-body pb-5">
                                    {/* <img src="../assets/img/team/profile-picture-1.jpg" className="avatar-xl rounded-circle mx-auto mt-n7 mb-4" alt="Neil Portrait"> */}
                                    <h4 className="h3">Mukesh</h4>
                                    <h5 className="fw-normal">Senior Software Engineer</h5>
                                    <p className="text-gray mb-4">Bangalore, USA</p>
                                    <a className="btn btn-sm btn-gray-800 d-inline-flex align-items-center me-2" href="#">
                                        <svg className="icon icon-xs me-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
                                        Connect
                                    </a>
                                    <a className="btn btn-sm btn-secondary" href="#">Send Message</a>
                                </div>
                             </div>
                        </div>
                        <div className="col-12">
                            <div className="card card-body border-0 shadow mb-4">
                                <h2 className="h5 mb-4">Select profile photo</h2>
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        {/* <img className="rounded avatar-xl" src="../assets/img/team/profile-picture-3.jpg" alt="change avatar"> */}
                                    </div>
                                    <div className="file-field">
                                        <div className="d-flex justify-content-xl-center ms-xl-3">
                                            <div className="d-flex">
                                                <svg className="icon text-gray-500 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                                                <input type="file" />
                                                <div className="d-md-block text-left">
                                                    <div className="fw-normal text-dark mb-1">Choose Image</div>
                                                    <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                                                </div>
                                            </div>
                                        </div>
                                     </div>                                        
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card card-body border-0 shadow">
                                <h2 className="h5 mb-4">Select cover photo</h2>
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        {/* <img className="rounded avatar-xl" src="../assets/img/profile-cover.jpg" alt="change cover"> */}
                                    </div>
                                    <div className="file-field">
                                        <div className="d-flex justify-content-xl-center ms-xl-3">
                                            <div className="d-flex">
                                                <svg className="icon text-gray-500 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                                                <input type="file" />
                                                <div className="d-md-block text-left">
                                                    <div className="fw-normal text-dark mb-1">Choose Image</div>
                                                    <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                                                </div>
                                            </div>
                                        </div>
                                     </div>                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="theme-settings card bg-gray-800 pt-2 collapse" id="theme-settings">
    <div className="card-body bg-gray-800 text-white pt-4">
        {/* <button type="button" className="btn-close theme-settings-close" aria-label="Close" data-bs-toggle="collapse"
            ref="#theme-settings" role="button" aria-expanded="false" aria-controls="theme-settings"></button> */}
        <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="m-0 mb-1 me-4 fs-7">Open source <span role="img" aria-label="gratitude">💛</span></p>
            <a className="github-button" href="https://github.com/themesberg/volt-bootstrap-5-dashboard"
                data-color-scheme="no-preference: dark; light: light; dark: light;" data-icon="octicon-star"
                data-size="large" data-show-count="true"
                aria-label="Star themesberg/volt-bootstrap-5-dashboard on GitHub">Star</a>
        </div>
        <a href="https://themesberg.com/product/admin-dashboard/volt-bootstrap-5-dashboard" target="_blank"
            className="btn btn-secondary d-inline-flex align-items-center justify-content-center mb-3 w-100">
            Download 
            <svg className="icon icon-xs ms-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clip-rule="evenodd"></path></svg>
        </a>
        <p className="fs-7 text-gray-300 text-center">Available in the following technologies:</p>
        <div className="d-flex justify-content-center">
            <a className="me-3" href="https://themesberg.com/product/admin-dashboard/volt-bootstrap-5-dashboard"
                target="_blank">
                {/* <img src="../assets/img/technologies/bootstrap-5-logo.svg" className="image image-xs"> */}
            </a>
            <a href="https://demo.themesberg.com/volt-react-dashboard/#/" target="_blank">
                {/* <img src="../assets/img/technologies/react-logo.svg" className="image image-xs"> */}
            </a>
        </div>
    </div>
</div>

<div className="card theme-settings bg-gray-800 theme-settings-expand" id="theme-settings-expand">
    <div className="card-body bg-gray-800 text-white rounded-top p-3 py-2">
        <span className="fw-bold d-inline-flex align-items-center h6">
            <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
            Settings
        </span>
    </div>
</div>

</main>
        </Container>
    )
};

export default ProfilePage;
