import * as React from 'react';
import './index.css';

interface HeaderProps {}

class Header extends React.Component<HeaderProps, {}> {
  render() {
    return (
      <div className="Header">Niffler</div>
    );
  }
}

export default Header;