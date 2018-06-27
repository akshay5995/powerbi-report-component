# Powerbi Report Component

It's a minimalistic react component to embed a Microsoft PowerBI report or dashboard into your react application.
Makes embedding a microsoft powerbi report/ dashboard  into your react application a breeze.

## Installation

```npm i powerbi-report-component```

## Usuage

``` 
import React, {Component} from 'react';
import Report from 'powerbi-report-component';

class MyComponent extends Component {
  ...
  handleDataSelected = (data) => {
    // will be called when some chart or data element in your report clicked
  }

  handleReportLoad = () => {
    // will be called when report loads
  }

  handlePageChange = (data) => {
    // will be called when pages in your report changes
  }

  render() {
    const reportStyle = {
        // style object for report component
    };
    const extraSettings = {
            filterPaneEnabled: false, //true
            navContentPaneEnabled: false, //true
            // ... more custom settings
    };
    return (
    <div className="root">
        <Report 
            embedType="report" // "dashboard"
            tokenType="Embed" // "Aad"
            accessToken="" // accessToken goes here
            embedUrl="" // embedUrl goes here
            embedId="" // report or dashboard Id goes here
            extraSettings={extraSettings}
            permissions="All" // View
            style={reportStyle}
            onLoad={this.handleReportLoad}
            onSelectData={this.handleDataSelected}
            onPageChange={this.handlePageChange}
        />
    </div>
    );
  }
}

  ```



## Features

- Custom styling by passing style to your embedded report component.
- Component also lets you pass callbacks to trigger on events like:
    - Page Change   
    - Load
    - Data Element Clicked

## More features coming soon!! :zap:

For demo visit: 
> http://akshay5995.github.io/powerbi-report-component

For Sample embed token , embed url and embed Id visit:(More docs)

https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#
