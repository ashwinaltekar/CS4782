# CS4782 - Information Security Framework Master
Git Repo for UMSL Spring 2017 'Introduction to Cyber Security' class project

<b>// PROJECT DESCRIPTION AND INTENDED USE</b>
<h1>Problem Statement:</h1>
There exists many information security frameworks and standards (e.g. best practices enumerated by infosec practitioners, private regulations, public regulations, ISACs, etc). These different frameworks and standards ultimately cover a common set of best practice controls (people, process, technology) but simply reorganize the controls in different ways or apply them to different organizational scopes (e.g. risk-based models, compliance mandates, Client requirements).

Most organizations must meet the requirements of multiple security frameworks or standards in order to continue business operations. For example, a public healthcare organization that accepts credit card transactions may need to comply with SOX, HIPAA, HITRUST, and PCI DSS control requirements to reduce the risk of financial loss (e.g. impacts to sales revenue or margin erosion through operational overhead).

This project is intended for Corporate Information Security Professionals that seek to more efficiently manage their information security policy and associated controls. The utility of this project includes:
  - A visual breakdown of multiple information security frameworks all in one view
  - The ability to hierarchically view the detailed control structure and descriptions of each supported framework
  - A cross-walk view of multiple information security frameworks maintained through manual pruning and AI-driven insights
  - The ability to map framework controls to custom organizational models in order to assign and track control owners to a specific organization
  - Commonly accepted success criteria (qualitative) and metrics (quantitative) to assess control effectiveness
  - Dashboards views for each control
  - All features run on a MEAN (Mongo.Express.Angular.Node) stack and a fully functional instance of the project can be easily set up for private use
  - Ability to export/import/edit objects and custom configurations through JSON

This file will contain additional details on the different discrete components to complete in Spring 2017.

// These high-level requirements should be the starting point for the features that will be implemented for the project

High-Level Requirements:
  - Visual and interactive display of common risk management frameworks and their structure
  - Cross-walk between various frameworks and controls
  - Ability to customize a a pre-defined security framework
  - Ability to create 'current' v. 'target' maturity profiles for organizations that want to report against a specific framework, or combination of frameworks
  - Ability to compare frameworks side-by-side
  - Data Structure (e.g. JSON) that can incorporate additional frameworks and revisions to current frameworks
  - Ability to create a view of the IT functional organization
  - Ability to map framework controls to IT functional organizations/departments

// These are a few suggested modules that you can break the work down into

Module #1: Front end design (AngularJS)
  - create the UI layer, what are functional requirements?
  - create layout and style

Module #2: InfoSec framework data schema
  - create framework data classes and objects (stored in DB like Mongo and/or in JSON)
