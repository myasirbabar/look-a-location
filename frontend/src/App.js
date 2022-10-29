import React from 'react';
/*
  Changes are 
  * Switch is replaced with Routes
  * Redirect is replaced with Navigate
*/

import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NewPlace  from './Places/pages/NewPlace';
import MainNavigation from './Shared/components/Navigation/MainNavigation';
import Users from './Users/pages/Users';
import UserPlaces from './Places/pages/UserPlaces';
import UpdatePlace from './Places/pages/UpdatePlace';
import Authentication from './Users/pages/Authentication';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          
          {/* To render component we use element and bellow syntax */}
          <Route path='/' exact element = {<Users />} />
          
          <Route path='/auth' exact element = {<Authentication />}/>

          <Route path='/:userId/places' exact element = {<UserPlaces />} />

          <Route path='/new/places' exact element = {<NewPlace />} />

          <Route path='/places/:pid' element = {<UpdatePlace />} />
          
          {/* To Redirect we use Navigate as Route element */}
          <Route path='*' element = {<Navigate to = "/" replace />}/>

        </Routes>
      </main>
    </Router>
  );
}

export default App;
