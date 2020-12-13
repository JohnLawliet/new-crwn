import React from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import MenuItem from '../menu-item/menu-item.component';
import {selectSections} from '../../redux/directory/directory.selectors'

import './directory.styles.scss';

const Directory = ({ sections }) => {
  
  // ...directoryProps is applicable since both prop name and key name are same like size={size}
  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...directoryProps }) => (
        <MenuItem key={id} {...directoryProps} />
      ))}s
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sections: selectSections
})

export default connect(mapStateToProps)(Directory);
