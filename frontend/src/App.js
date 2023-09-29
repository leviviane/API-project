import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/AllSpots/AllSpots';
import SingleSpotDetails from './components/SingleSpotDetails/SingleSpotDetails';
import CreateSpotForm from './components/CreateSpot/CreateSpot';
import ManageSpots from "./components/ManageSpots/ManageSpots";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path='/'>
          <AllSpots />
        </Route>
        <Route exact path ='/spots/new'>
          <CreateSpotForm />
        </Route>
        <Route exact path='/spots/current'>
          <ManageSpots />
        </Route>
        <Route exact path='/spot/:spotId'>
          <SingleSpotDetails />
        </Route>
        </Switch>}
    </>

  );
}

export default App;
