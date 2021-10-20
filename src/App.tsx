import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from '@taquito/signer';
import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import DisconnectButton from "./components/DisconnectWallet";
import qrcode from "qrcode-generator";
import UpdateContract from "./components/UpdateContract";
import Transfers from "./components/Transfers";

import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import NavbarMain  from './components/NavbarMain';
import HomePage from './components/HomePage';
import SetupForm  from './components/SetupForm';
// import Account from './components/Account';
import ClaimPage from "./components/ClaimPage";
import ProfilePage from "./components/ProfilePage";
import InteractAdd from './components/InteractAdd';
import InteractWithdraw from "./components/InteractWithdraw";
import InteractUpdateDays from "./components/InteractUpdateDays";
import InteractUpdateSecret from "./components/InteractUpdateSecret";
import InteractUpdateReceiver from "./components/InteractUpdateReceiver";

import { DAppProvider, useConnect } from './dapp/dapp'
import { APP_NAME, NETWORK } from './dapp/default';
import { render } from "@testing-library/react";



const App = () => {
  return (<DAppProvider appName={APP_NAME}>
      <React.Suspense fallback={null}>
        <div className="App">
          <Router>
            <Route path='/' exact>
                  <NavbarMain />
                  <HomePage />
            </Route>
            <Route 
              path='/setup'
              >
                  <NavbarMain />
                  <SetupForm />
                
            </Route>
            <Route
              path='/account'
              >
                  <NavbarMain />
                  {/* <Account /> */}
                </Route>
            <Route
              path='/claim'
              >
                  <NavbarMain />
                  <ClaimPage />
            </Route>
            <Route
              path='/profile'
              >
                  {/* <NavbarMain /> */}
                  <ProfilePage />
            </Route>
            <Route
              path='/interact/add'
              >
                  {/* <NavbarMain /> */}
                  <InteractAdd />
            </Route>
            <Route
              path='/interact/withdraw'
              >
                  {/* <NavbarMain /> */}
                  <InteractWithdraw />
            </Route>
            <Route
              path='/interact/updatedays'
              >
                  {/* <NavbarMain /> */}
                  <InteractUpdateDays />
            </Route>
            <Route
              path='/interact/updatesecret'
              >
                  {/* <NavbarMain /> */}
                  <InteractUpdateSecret />
            </Route>
            <Route
              path='/interact/updatereceiver'
              >
                  {/* <NavbarMain /> */}
                  <InteractUpdateReceiver />
            </Route>
          </Router>
        </div>
      </React.Suspense>
    </DAppProvider>)
};

export default App;
