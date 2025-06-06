import express from 'express';
import { createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord, findLastRecord, findLastReportDate, totalRecords, chartData, totalSMNames, getLastUpdatedDate, getLinksBySMName } from '../controllers/dataController.js';


const route = express.Router();

//New record will be create in http://localhost:3000/api/create_record . "/api" is mentioned in index.js
route.post('/create_record', createRecord)

// route for getting all records
route.get('/get_records', getAllRecords)

// route for getting a specific record
route.get('/get_record/:id', getRecordById)

// route for updating a specific record
route.put('/update_record/:id', updateRecord)

// route for deleting a specific record
route.delete('/delete_record/:id', deleteRecord)

// route for getting the count of records
route.get('/last_record/', findLastRecord)

//route for getting total records
route.get('/total_records/', totalRecords)

// route for getting chart data
route.get('/chart_data/', chartData)

// route to get all distinct sm_name
route.get('/total_accounts/', totalSMNames)

// route to get last report date
route.get('/last_report_date/', findLastReportDate)

// route to get last updated date
route.get('/last_updated_date/', getLastUpdatedDate)

// route to get links by sm_name
route.get('/links/:sm_name', getLinksBySMName)


export default route;