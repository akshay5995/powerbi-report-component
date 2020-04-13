# Powerbi Report Component

![downloads](https://img.shields.io/npm/dw/powerbi-report-component?label=npm%20downloads&style=for-the-badge)
![license](https://img.shields.io/github/license/akshay5995/powerbi-report-component?color=blue&style=for-the-badge)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/akshay5995/powerbi-report-component?style=for-the-badge)

It's a minimalistic React component for embedding a Microsoft PowerBI report, dashboard or tile into your React application.

*Now the component has additional feature to create report in embedType = 'report' mode.*

This repository is actively maintained by [Akshay Ram (akshay5995)](https://github.com/akshay5995) and [Satya J (satya-j)](https://github.com/satya-j).

## Installation

`npm i powerbi-report-component`

## Usuage

```javascript
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
    // will be called when report loads:
    // - scripts and data received from server, visuals are rendered on the browser
    // - flickering Power BI logo stops appearing but report is not fully ready to be consumed

    this.report = report; // get the object from callback and store it.(optional)
  }

  handleReportRender = (report) => {
    // will be called when report renders:
    // - visuals finish rendering
    // - report is fully visible and ready for consumption

    this.report = report; // get the object from callback and store it.(optional)
  }

  handlePageChange = (data) => {
    // will be called when pages in your report changes
  }

  handleTileClicked = (data) => {
    console.log('Data from tile', data);
  }

  render() {
    const reportStyle = {
        // style object for report component
    };
    const extraSettings = {
            filterPaneEnabled: false, //true
            navContentPaneEnabled: false, //true
            hideErrors: false // Use this *only* when you want to overide error experience i.e, use onError 
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
            pageName="" // set as current page of the report
            reportMode="view" // open report in a particular mode view/edit/create (create works only for embedType=report).
            dashboardId={dashboardId} // required when embedType is "tile"
            datasetId={datasetId} // required for reportMode = "create"
            extraSettings={extraSettings}
            permissions="All" // View
            style={reportStyle}
            onLoad={this.handleReportLoad}
            onRender={this.handleReportRender}
            onSelectData={this.handleDataSelected}
            onPageChange={this.handlePageChange}
            onTileClicked={this.handleTileClicked}
            onSave={this.handleReportSave} // works for edit and create
        />
    </div>
    );
  }
}

```

> this.report can be used to perform operations like 'Fullscreen' or 'Print the report'

### To use the report object returned by onLoad/onRender

Inside your compoent where you're using { Report } component.

_Constructor:_

```javascript
  ...
  constructor(props) {
    super(props);
    this.report = null; //used to store value of returned report object
  }
  ....

```

_Callback passed to the onLoad or onRender prop_

```javascript
  handleReportLoad = (report) => {
    this.report = report; // get the report object from callback and store it.
  }

  handleReportRender = (report) => {
    this.report = report; // get the report object from callback and store it.
  }

  ...
```

_using the_ this.report _to perform operations_

```javascript
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

```javascript
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

## Dashboard events: (When embedType === "dashboard")

```javascript
handleTileClicked = (data) => {
    console.log('Data from tile', data);
}

```

### Features

Currently supported features:

1. Custom styling by passing style to your embedded report component.
2. The component also lets you pass callbacks to trigger on events like:

Page Change

```javascript
  onPageChange={(data) =>
    console.log(`Page name :{data.newPage.displayName}`)
  }
```

Load

```javascript
  onLoad={(report) => {
    console.log('Report Loaded!');
    this.report = report;
    }
  }
```

```javascript
  onSave={(report) => {
    console.log('Report Saved!');
    this.report = report;
    }
  }
```

Render

```javascript
  onRender={(report) => {
    console.log('Report Rendered!');
    this.report = report;
    }
  }
```

Button Clicked

```javascript
  onButtonClicked={(data) => {
    console.log(`Button ${data.title} of type ${data.type} Clicked!`);
    }
  }
```

Filters Applied (In documentation, but not yet supported)

```javascript
  onFiltersApplied={(filters) => {
    console.log('Filters Applied!');
    }
  }
```

Command Triggered

```javascript
  onCommandTriggered={(extensionCommand) => {
    console.log('Extension Command Triggered!');
    }
  }
```

Data Element Clicked

```javascript
  onSelectData={(data) =>
    console.log(`You clicked on chart: ${data.visual.title}`);
  }
```

Handle errors gracefully

```javascript
  onError={(data) => 
     console.log(`Error: ${data}`);
  }
```

3. Use ‘report’ object returned to parent component for:

# Change Report Mode to View or Edit:

```javascript
  //mode can be "view" or "edit"

  changeMode = (mode) => this.report.switchMode(mode);
```

# Fullscreen

```javascript
  setFullscreen = () => this.report.fullscreen();
```

# Print Report

```javascript
  printReport = () => this.report.print();
```

# Set Filters

```javascript
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

# Get Filters

```javascript
  getFilter = () => this.report.getFilters().then(function (filters) {
        console.log(filters);
    }).catch(function (errors) {
        console.log(errors);
    });

```

# Remove Filters

```javascript
  removeFilters = () => this.report.removeFilters()
    .catch(function (errors) {
        console.log(errors);
    });

```

# Save edited report when in "edit" mode 
(note: you need to have enough permissions to save the report)

```javascript
    async saveReport() {
    if (this.report) {
      try{
        await this.report.save();
      } catch (err) {
        console.log("Error saving report", err);
      }
    }
  }

```

# Show / Hide all visual headers:

```javascript
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

For playgroud visit:

> http://akshay5995.github.io/powerbi-report-component

You can find out how to generate token for your report using Powershell from [this video](https://www.youtube.com/watch?v=4KuyPNtVijo).

_Don't have a Report?_

You can get the Token, URL and Report ID from Microsoft JS playground:

> https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#

Follow the instructions below in image:

![instructions not available](https://raw.githubusercontent.com/akshay5995/powerbi-report-component/master/images/Embed-Instructions.png)
