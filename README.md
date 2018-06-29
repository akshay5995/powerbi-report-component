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
  constructor(props) {
    super(props);
    this.report = null; // to store the loaded report's object to perform operations like print, fullscreen etc..
  }
  ...
  handleDataSelected = (data) => {
    // will be called when some chart or data element in your report clicked
  }

  handleReportLoad = (report) => {
    // will be called when report loads

    this.report = report; // get the object from callback and store it.(optional)
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

> this.report can be used to perform operations like 'Fullscreen' or 'Print the report'

### To use the report object returned by OnLoad

Inside your compoent where you're using { Report } component.

*Constructor:*
```
  ...
  constructor(props) {
    super(props);
    this.report = null; //used to store value of returned report object
  }
  ....

```

*Callback passed to be passed to onLoad prop*

```

  handleReportLoad = (report) => {
    this.report = report; // get the report object from callback and store it.
  }

  ....
```

*using the* this.report *to perform operations*

```
  ...

  setFullscreen = () => {
    if(this.report) this.report.fullscreen();
  }

  printReport = () => {
    if(this.report) this.report.print();
  }

  ...

  //Inside render

  <button onClick={this.setFullscreen}>Fullscreen</button>
  <button onClick={this.printReport}>Print</button>

  ...

```


## Features

- Custom styling by passing style to your embedded report component.
- Component also lets you pass callbacks to trigger on events like:
    - Page Change   
    - Load
    - Data Element Clicked
    - Fullscreen
    - Print Report

## More features coming soon!! :zap:

For demo visit: 
> http://akshay5995.github.io/powerbi-report-component

Use Token, URL, Report ID from:

> https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#

Follow the instructions below in image:

![instructions not available](https://raw.githubusercontent.com/akshay5995/powerbi-report-component/master/images/Embed-Instructions.png)
