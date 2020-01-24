import React from "react";
import "./App.css";
import Notes from "./components/Notes";
import FrameComponent from './components/frame';
import { Route, Switch } from "react-router-dom";

export default function App() {
  return <div style={{ width: '100%', minHeight: '100%' }}>
    <Switch>
      <Route exact path='/iframe' component={FrameComponent} />
      <Route path='/' component={Notes} />
    </Switch>
    </div>;
}
