import React from 'react';
import { CalendarContainer } from '../containers/CalendarContainer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Reminders } from './Reminders';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact>
        <CalendarContainer />
      </Route>
      <Route path='/reminders' exact>
        <Reminders />
      </Route>
    </Switch>
  </BrowserRouter>
);
