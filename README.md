# Powerbi Report Component

![downloads](https://img.shields.io/npm/dw/powerbi-report-component?label=npm%20downloads&style=for-the-badge)
![license](https://img.shields.io/github/license/akshay5995/powerbi-report-component?color=blue&style=for-the-badge)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/akshay5995/powerbi-report-component?style=for-the-badge)

It's a minimalistic React component for embedding a Microsoft PowerBI report, dashboard or tile into your React application.

This repository is actively maintained by [Akshay Ram (akshay5995)](https://github.com/akshay5995) and [Satya J (satya64)](https://github.com/satya64).

Existing users of the package please refer to Change Log [here](https://github.com/akshay5995/powerbi-report-component/wiki/Changelog) and please refer [here](https://github.com/akshay5995/powerbi-report-component/wiki/README-file-for--=-2.0.0) for the README for versions <=2.0.0.

## Installation

`npm i powerbi-report-component`

## Usuage for Report

```javascript
import React, {Component} from 'react';
import { Report } from 'powerbi-report-component';

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

    this.report = report; // get the report object from callback and store it.(optional)
  }

  handleReportRender = (report) => {
    // will be called when report renders:
    // - visuals finish rendering
    // - report is fully visible and ready for consumption

    this.report = report; // get the report object from callback and store it.(optional)
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
            tokenType="Embed" // "Aad"
            accessToken="" // accessToken goes here
            embedUrl="" // embedUrl goes here
            embedId="" // report or dashboard Id goes here
            pageName="" // set as current page of the report
            reportMode="view" // open report in a particular mode view/edit/create
            datasetId={datasetId} // required for reportMode = "create" and optional for dynamic databinding in `report` on `view` mode
            extraSettings={extraSettings}
            permissions="All" // View
            style={reportStyle}
            onLoad={this.handleReportLoad}
            onRender={this.handleReportRender} // not allowed in `create`
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

## Usuage for Dashboard

```javascript
import { Dashboard } from 'powerbi-report-component';

// inside render
<Dashboard
  tokenType={tokenType}
  accessToken={accessToken}
  embedUrl={embedUrl}
  embedId={embedId}
  style={style} // style object for dashboard component
  pageView={pageView} // 'fitToWidth' (default) , 'oneColumn', 'actualSize'
  onLoad={(dashboard) => {
    console.log('Dashboard Loaded!');
    this.dashboard = dashboard; // get the dashboard object from callback and store it.(optional)
  }}
  onTileClicked={(data) => {
    console.log('Data from tile', data);
  }}
/>
```

## Usuage for Tile

```javascript
import { Tile } from 'powerbi-report-component';

// inside render
<Tile
  tokenType={tokenType}
  accessToken={accessToken}
  embedUrl={embedUrl}
  embedId={embedId}
  dashboardId={dashboardId}
  style={style} // style tile for report component
  onClick={(data) => {
    console.log('Data from tile', data);
  }}
  onLoad={(data) => {
    console.log('Tile loaded', data);
  }}
/>
```

## Like hooks ? You'll love this :)

### useReport (available from v2.1.1)

Provides a more find grained approach for embedding. (where you're in control)

```javascript
import React, { useEffect, useRef } from 'react';
import { useReport } from 'powerbi-report-component';

const MyReport = ({ accessToken, embedUrl, reportId }) => {
  const reportRef = useRef(null);
  const [report, setEmbed] = useReport();

  const myReportConfig = {
    embedType: 'report',
    tokenType: 'embed',
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: reportId,
    settings: {
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
    },
  };

  // !important
  useEffect(() => {
    // call inside useEffect so the we have the reportRef (reference available)
    setEmbed(reportRef, myReportConfig);
  }, []);

  const handleclick = () => {
    // you can use "report" from useReport like
    if (report) report.print();
  };

  return (
    <div className="report-container">
      <div className="report" ref={reportRef} />
      <button onClick={handleclick}>Print my report</button>
    </div>
  );
};

export default MyReport;
```

## Report features and props you can pass into the component

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

Report Page Change

```javascript
  onPageChange={(data) =>
    console.log(`Page name :{data.newPage.displayName}`)
  }
```

Report Load

```javascript
  onLoad={(report) => {
    console.log('Report Loaded!');
    this.report = report;
    }
  }
```

```javascript
  onSave={(data) => {
    console.log('Report Saved! Event data: '+data);
    }
  }
```

Report Render

```javascript
  onRender={(report) => {
    console.log('Report Rendered!');
    this.report = report;
    }
  }
```

Report Button Clicked

```javascript
  onButtonClicked={(data) => {
    console.log(`Button ${data.title} of type ${data.type} Clicked!`);
    }
  }
```

Report Command Triggered

```javascript
  onCommandTriggered={(extensionCommand) => {
    console.log('Extension Command Triggered!');
    }
  }
```

Report Data Element Clicked

```javascript
  onSelectData={(data) =>
    console.log(`You clicked on chart: ${data.visual.title}`);
  }
```

Report Handle Errors

```javascript
  onError={(data) =>
     console.log(`Error: ${data}`);
  }
```

Use ‘report’ object returned to parent component or from `useReport` for:

Note: you wouldn't use `this` if you're using `report` from `useReport` hook.

1. Change Report Mode to View or Edit:

```javascript
//mode can be "view" or "edit"

changeMode = (mode) => this.report.switchMode(mode);
```

2. Fullscreen

```javascript
setFullscreen = () => this.report.fullscreen();
```

3. Print Report

```javascript
printReport = () => this.report.print();
```

4. Set Filters

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

5. Get Filters

```javascript
getFilter = () =>
  this.report
    .getFilters()
    .then(function (filters) {
      console.log(filters);
    })
    .catch(function (errors) {
      console.log(errors);
    });
```

6. Remove Filters

```javascript
removeFilters = () =>
  this.report.removeFilters().catch(function (errors) {
    console.log(errors);
  });
```

7. Save edited report when in "edit" mode

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

8. Show / Hide all visual headers:

```javascript
toggleAllVisualHeaders = (bool) => {
  const newSettings = {
    visualSettings: {
      visualHeaders: [
        {
          settings: {
            visible: bool, // boolean variable
          },
        },
      ],
    },
  };
  this.report
    .updateSettings(newSettings)
    .then(function () {
      console.log('Visual header toggle successful.');
    })
    .catch(function (errors) {
      console.log(errors);
    });
};
```

## Dashboard features and props you can pass into the component

Dashboard Load

```javascript
  onLoad={(dashboard) => {
    console.log('Report Loaded!');
    this.dashboard = dashboard;
    }
  }
```

Dashboard Tile Click

```javascript
onTileClicked = {(data) => {
  console.log('Data from tile', data);
}}
```

Use dashboard object returned to parent component for:

1. Fullscreen

```javascript
setFullscreen = () => this.dashboard.fullscreen();
```

## Tile features and props you can pass into the component

Tile Load

```javascript
  onLoad={(data) => {
    console.log('Data from tile', data);
  }}
```

Tile Click

```javascript
onClick = {(data) => {
    console.log('Data from tile', data);
}}
```

For playgroud visit:

> http://akshay5995.github.io/powerbi-report-component

You can find out how to generate token for your report using Powershell from [this video](https://www.youtube.com/watch?v=4KuyPNtVijo).

_Don't have a Report?_

You can get the Token, URL and Report ID from Microsoft JS playground:

> https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#

Follow the instructions below in image:

![instructions not available](https://raw.githubusercontent.com/akshay5995/powerbi-report-component/master/images/Embed-Instructions.png)
