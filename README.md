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

For Report Level Filters:

```

  /*
    Example filter object used in microsoft's demo page:

    const filter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "Store",
          column: "Chain"
        },
        operator: "In",
        values: ["Lindseys"]
      };
  */
  

  ...

  setFilter = (filter) => this.report.setFilters([filter]).catch(function (errors) {
        console.log(errors);
    });
  
  getFilter = () => this.report.getFilters().then(function (filters) {
          console.log(filters);
      }).catch(function (errors) {
          console.log(errors);
      });

  removeFilters = () => this.report.removeFilters()
      .catch(function (errors) {
          console.log(errors);
      });

  ...

```


## Features

Currently supported features:

1. Custom styling by passing style to your embedded report component.
2. The component also lets you pass callbacks to trigger on events like:

  Page Change
  ```
    onPageChange={(data) => 
    console.log(`Page name :{data.newPage.displayName}`) 
    }
  ```
  Load
  ```
    onLoad={(report) => { 
      console.log('Report Loaded!');
      this.report = report;
      }
    }
  ```
  Data Element Clicked
  ```
    onSelectData={(data) => 
      console.log(`You clicked on chart: {data.visual.title}`)
    }
  ```
3. Use ‘report’ object returned to parent component for:

  #Change Report Mode to View or Edit:

  ```
    //mode can be "view" or "edit"

    changeMode = (mode) => this.report.switchMode(mode);
  ```

  #Fullscreen

  ```
    setFullscreen = () => this.report.fullscreen();
  ```

  #Print Report

  ```
    printReport = () => this.report.print();
  ```

  #Set Filters

  ```
      //example filter from microsoft's demo page

      const filter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "Store",
          column: "Chain"
        },
        operator: "In",
        values: ["Lindseys"]
      };

      // using event handlers

      setFilter = (filter) => this.report.setFilters([filter]).catch(function (errors) {
        console.log(errors);
      });

      // during onload

      onLoad = (report) => { 
        report.setFilters([filter]).catch(function (errors) {
          console.log(errors);
        });
        this.report = report;
      }
    }

  ```

  #Get Filters

  ```
    getFilter = () => this.report.getFilters().then(function (filters) {
          console.log(filters);
      }).catch(function (errors) {
          console.log(errors);
      });

  ```

  #Remove Filters

  ```

    removeFilters = () => this.report.removeFilters()
      .catch(function (errors) {
          console.log(errors);
      });

  ```

  
  #Show / Hide all visual headers:

  ```

  toggleAllVisualHeaders = (bool) => 
  {
    const newSettings = {
      visualSettings: {
        visualHeaders: [
          {
            settings: {
              visible: bool,  // boolean variable
            }
          }
        ]
      }
    }
    this.report.updateSettings(newSettings)
      .then(function () {
        console.log("Visual header toggle successful.");
      })
      .catch(function (errors) {
        console.log(errors);
      });
  }

  ```
## More features coming soon!! :zap:

For demo visit: 
> http://akshay5995.github.io/powerbi-report-component

Use Token, URL, Report ID from:

> https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#

Follow the instructions below in image:

![instructions not available](https://raw.githubusercontent.com/akshay5995/powerbi-report-component/master/images/Embed-Instructions.png)

Follow me on:
  Medium: https://medium.com/@akshay5995

