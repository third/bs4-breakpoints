import React from 'react';

class App extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        let containerCss = 'centered-box',
            breakpointNameCss = 'breakpoint-name',
            breakpointSizeCss = 'breakpoint-size',
            screenOrientationCss = 'screen-orientation';        
        
        return (
            <div className={containerCss}>
                <h1 className={breakpointNameCss}>* Device</h1>
                <p className={breakpointSizeCss}>* (*px)</p>
                <p className={screenOrientationCss}>Orientation: *</p>
            </div>
        )
    }
}

export default App;