# Tableau Extension API: Microsoft SQL Server Write Back

Created by [Andre de Vries](https://www.twitter.com/andre347_) (11th June 2018)

#### **The Tableau Extension API is still in Development and therefore will contain bugs and should only be deployed when it has been released. This is solely for testing purposes. Please report any bugs straight to Tableau**

Tableau Extension that allows you to create a add data to your Microsfot SQL Server from within a Tableau Dashboard. Once you've added your data, you can refresh the data source and you can continue your analysis. All without having to leave Tableau.

This version of the extension **should be hosted locally**. I will release a hosted version later, which means you don't have to run a server on your localhost.

## Extension Installation Instructions

1.  Download the **write-back-mssql.trex** file
2.  cd into the main folder ('write_back_mssql') and start a server 'node app.js'
3.  This will open a server on port 3000
4.  Open Tableau (currently only beta 2018.2 can read the trex manifest file) and add an extension object in the dashboard
5.  Submit any bugs/requests by Twitter/Email/Github
