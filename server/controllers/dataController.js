import SocialData from '../models/dataModel.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



//Function for creating a record
export const createRecord = async (req, res) => {
    try {
        const newRecord = new SocialData(req.body)
        // console.log(newRecord)

        const { record_id } = newRecord

        // Checking whether the record already exists..
        const recordExist = await SocialData.findOne({ record_id })
        if (recordExist) {
            return res.status(400).json({ message: "Record already exists" })
        }
        // Else save the record to the database
        const saveRecord = await newRecord.save()

        res.status(200).json({ message: "Record created successfully" })

    } catch (error) {
        // res.status(500).json({ message: "Error saving record" })
        res.status(500).json(error.message)
    }
}

//function to find the last record_id
export const findLastRecord = async (req, res) => {
    try {
        const lastRecord = await SocialData.find().sort({ record_id: -1 }).limit(1)
        // console.log('last record: ', lastRecord)
        res.status(200).json({ lastRecord: lastRecord[0].record_id })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//function  for getting all records. Commented code is for pagination but currently not in use because frontend is paginated using PrimeReact Library
export const getAllRecords = async (req, res) => {
    // Extract page from the req url and Default to page 1 if not provided
    // const page = parseInt(req.query.page) || 1

    // Extract limit from the req url and Default to 10 if not provided
    // const limit = parseInt(req.query.limit) || 10

    // Skips the specified no of records from the database when retrieving data
    // const skip = (page - 1) * limit

    try {

        // uses an empty filter object {}. This is equivalent to a SELECT * FROM SocialData WHERE true query in SQL, which is always true, so all documents are returned.
        const records = await SocialData.find({})
        // .skip(skip) // Skip the records for previous pages
        // .limit(limit); // Limit the number of records returned

        // const totalRecords = await SocialData.countDocuments(); // Total number of records in the collection
        // const totalPages = Math.ceil(totalRecords / limit); // Calculate total pages

        //If there are no records to retrieve
        if (!records || records.length === 0) {
            return res.status(404).json({ message: "No records to retrieve.." })
        }

        // Else return the records
        // res.status(200).json({
        //     records: records,
        //     totalPages: totalPages
        // })

        res.status(200).json({ records })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// function for getting record by id
export const getRecordById = async (req, res) => {
    try {
        // get the id from the url parameter
        const id = req.params.id

        // checking if the record exists
        const recordExist = await SocialData.findById(id)
        if (!recordExist) {
            return res.status(404).json({ message: "Specified record does not exist.." })
        }
        res.status(200).json(recordExist)
    } catch (error) {
        res.status(500).json(error.message)

    }
}

// function for updating a record
export const updateRecord = async (req, res) => {
    try {
        // get the id from the url parameter
        const id = req.params.id

        // checking if the record exists
        const recordExist = await SocialData.findById(id)
        if (!recordExist) {
            return res.status(404).json({ message: "Specified record does not exist.." })
        }
        //updating the record with req.body
        const updatedRecord = await SocialData.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: "Record updated successfully" });

    } catch (error) {
        res.status(500).json(error.message)
    }
}

// function for deleting a record. Currently deleting a record is disabled on frontend
export const deleteRecord = async (req, res) => {
    try {
        // get the id from the url parameter
        const id = req.params.id

        // checking if the record exists
        const recordExist = await SocialData.findById(id)
        if (!recordExist) {
            return res.status(404).json({ message: "Specified record does not exist.." })
        }

        // deleting the record
        await SocialData.findByIdAndDelete(id)
        res.status(200).json({ message: "Record deleted Successfully.." })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const totalRecords = async (req, res) => {
    try {
        const totalRecords = await SocialData.countDocuments();
        res.status(200).json({ totalRecords })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//function to find all the distinct sm_name in database
// export const totalSMNames = async (req, res) => {
//     try {
//         // Use the distinct method to get unique sm_names
//         const distinctSMNames = await SocialData.distinct("sm_name")

//         // Get the count of distinct sm_names
//         const totalDistinctSMNames = distinctSMNames.length;

//         // Send the result as a response
//         res.status(200).json({
//             totalNames: totalDistinctSMNames,
//             message: "Successfully retrieved total number of distinct sm_names"
//         });

//     } catch (error) {
//         res.status(500).json(error.message)
//     }
// }

//function to find all the distinct sm_name in database and return all distinct sm_name values with their latest link (based on insertion)

export const totalSMNames = async (req, res) => {
    try {
        const result = await SocialData.aggregate([
            {
                $match: {
                    sm_name: { $ne: "", $ne: null },
                    link: { $ne: "", $ne: null },
                },
            },
            {
                $sort: { _id: -1 }, // Ensure latest link is first
            },
            {
                $group: {
                    _id: "$sm_name",
                    latestLink: { $first: "$link" },
                    totalRecords: { $sum: 1 },
                },
            },
            {
                $project: {
                    sm_name: "$_id",
                    link: "$latestLink",
                    totalRecords: 1,
                    _id: 0,
                },
            },
        ]);

        res.status(200).json({
            totalNames: result.length,
            data: result,
            message: "Successfully retrieved all distinct sm_names with their latest links and counts",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




/**
 * Retrieves data for the charts on the dashboard page.
 * 
 * It makes two MongoDB aggregation queries to the SocialData collection.
 * The first query gets the top 10 'sm_name' by count, excluding documents where 'sm_name' is null.
 * The second query gets the top 10 'from' by count, excluding documents where 'from' is null.
 * 
 * The data is then sent back to the frontend as a JSON response with two properties: topSMNames and topFrom.
 * Each property is an array of objects with _id and count properties. The _id property is the value of 'sm_name' or 'from' respectively, and the count property is the number of occurrences of that value.
 * 
 */
export const chartData = async (req, res) => {
    try {
        // Aggregation to get top 10 'sm_name' by count
        const topSMNames = await SocialData.aggregate([
            {
                $match: { sm_name: { $ne: null } }, // Exclude documents where 'sm_name' is null
            }, {
                $group: {
                    _id: "$sm_name", // Group by 'sm_name'
                    count: { $sum: 1 }, // Count occurrences
                },
            },
            { $sort: { count: -1 } }, // Sort by count in descending order
            { $limit: 20 }, // Limit to top 10 results
        ]);

        // Aggregation to get top 10 'from' by count
        const topFrom = await SocialData.aggregate([
            {
                $match: { from: { $ne: null } }, // Exclude documents where 'from' is null
            }, {
                $group: {
                    _id: "$from", // Group by 'from'
                    count: { $sum: 1 }, // Count occurrences
                },
            },
            { $sort: { count: -1 } }, // Sort by count in descending order
            { $limit: 100 }, // Limit to top 10 results
        ]);

        // Send the data back to the frontend
        res.status(200).json({
            topSMNames,
            topFrom,
        });
    } catch (error) {
        res.status(500).json(error.message)
    }
}


// Function to get the last report date
export const findLastReportDate = async (req, res) => {
    try {
        // Find the most recent record based on the `report_date`
        const latestRecord = await SocialData.findOne()
            .sort({ report_date: -1 }) // Sort by `report_date` in descending order to get the most recent
            .select('report_date') // Only select the `report_date` field

        if (!latestRecord) {
            return res.status(404).json({ message: "No records found" })
        }
        // Return the last report date in dd-mm-yyyy format
        const date = new Date(latestRecord.report_date);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // console.log("Last Report Date: ", latestRecord.report_date)
        res.status(200).json({ lastReportDate: formattedDate })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Function to get the last updated date
export const getLastUpdatedDate = async (req, res) => {
    try {
        const lastUpdatedDate = await SocialData.findOne()
            .sort({ updatedAt: -1 });
        // console.log("Last Updated Record:", lastUpdatedDate.updatedAt);
        // Method to format date in to dd-mm-yyyy 
        if (lastUpdatedDate) {
            const date = new Date(lastUpdatedDate.updatedAt);
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            res.status(200).json({ lastUpdatedDate: formattedDate });
        }
        // res.status(200).json({ lastUpdatedDate: lastUpdatedDate.updatedAt });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to get all the links associated with a name
export const getLinksBySMName = async (req, res) => {
    try {
        const { sm_name } = req.params;
        const links = await SocialData.find({ sm_name, link: { $nin: ["", null] }, }).select('link');
        res.status(200).json({ links });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}