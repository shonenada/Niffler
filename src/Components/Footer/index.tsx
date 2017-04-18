import * as React from 'react';
import './index.css';

interface FooterProps {}

class Footer extends React.Component<FooterProps, {}> {
  render() {
    return (
      <div className="Footer">
        Coryright &copy; Niffler
      </div>
    );
  }
}

export default Footer;