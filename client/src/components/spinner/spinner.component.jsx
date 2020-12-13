// Spinner is an HOC which wrapped a component in it to display the spinner until the component has loaded

import React from 'react'

import {SpinnerOverlay, SpinnerContainer} from './spinner.styles'

const Spinner = WrappedComponent => ({ isLoading, ...otherProps}) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    )
}

export default Spinner