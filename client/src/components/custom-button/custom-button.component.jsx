import React from 'react'

import {CustomButtonContainer} from './custom-button.styles'
import './custom-button.styles.scss'

const CustomButton = ({children, ...otherProps}) => (
    <CustomButtonContainer {...otherProps} className="custom-button">
        {children}
    </CustomButtonContainer>
)


export default CustomButton