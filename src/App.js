import React from 'react';
import Spaces from './components/spaces';
import { FormattedMessage } from 'react-intl';

function App() {
  return (
    <div className="container mt-4">
      <h1><FormattedMessage id="MySpaces"/></h1>
      <Spaces />
    </div>
  );
}

export default App;
