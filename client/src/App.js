import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Restaurants from './pages/restaurants/Restaurants';

import { BottomNavWrapper } from './components/styles/app';
import './App.css';

function App() {
  const [filter, setFilter] = useState('');


  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Restaurants</Link>
              </li>
              {/* <li>
              <Link to="/dishes">Dishes</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li> */}
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <Restaurants />
            </Route>
            {/* <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route> */}
          </Switch>
        </div>
      </Router>
      <BottomNavWrapper>
        <BottomNavigation
          value={filter}
          onChange={(event, newValue) => {
            setFilter(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </BottomNavWrapper>
    </div>
  );
}

export default App;
