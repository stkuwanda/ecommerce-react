import React from "react";
import { connect } from "react-redux";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";

class Directory extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { sections } = this.props;

    return (
      <div className='directory-menu'>
        {sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ directory: { sections } }) => ({ sections });

export default connect(mapStateToProps)(Directory);
