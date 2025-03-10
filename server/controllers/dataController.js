import SocialData from '../models/dataModel.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Function to handle Sign Up
export const signupUser = async (req, res) => {
    const newUser = new User(req.body);
    const { pen } = newUser
    try {
        // Check whether the user already exists
        const userExist = await User.findOne({ pen })
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create a new user
        const saveUser = await newUser.save()
        res.status(200).json({ message: "User created successfully" })

    } catch (error) {
        res.status(500).json(error.message)
    }
}


// Function to handle user Login
export const loginUser = async (req, res) => {
    const { pen, password } = req.body
    try {
        // We look up the user in the database using their pen.
        const user = await User.findOne({ pen })
        if (!user) {
            return res.status(400).json({ message: "Invalid PEN or password" });
        }
        // We use bcrypt.compare() to check if the provided password matches the stored hashed password.
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid PEN or password" });
        }
        // If the passwords match, we generate a token using jwt.sign(). The token contains the user's unique ID and is signed with a secret key (your_jwt_secret). This secret key should be stored securely in environment variables.
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' })

        // Send the token to the client
        res.status(200).json({ token })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

//Function for creating a record
export const createRecord = async (req, res) => {
    try {
        const newRecord = new SocialData(req.body)
        // console.log(newRecord)

        /* `const { record_id } = newRecord` is a destructuring assignment in JavaScript. It is
        extracting the `record_id` property from the `newRecord` object and assigning it to a
        variable named `record_id`. This syntax allows you to extract specific properties from an
        object and assign them to variables with the same name. In this case, it is extracting the
        `record_id` property from the newly created record object for further use in the code. */
        const { record_id } = newRecord


        // Checking whether the record already exists..
        const recordExist = await SocialData.findOne({ record_id })
        if (recordExist) {
            return res.status(400).json({ message: "Record already exists" })
        }
        // const record_id = 
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

//function  for getting all records
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

// function for deleting a record
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
export const totalSMNames = async (req, res) => {
    try {
        // Use the distinct method to get unique sm_names
        const distinctSMNames = await SocialData.distinct("sm_name")

        // Get the count of distinct sm_names
        const totalDistinctSMNames = distinctSMNames.length;

        // Send the result as a response
        res.status(200).json({
            totalNames: totalDistinctSMNames,
            message: "Successfully retrieved total number of distinct sm_names"
        });

    } catch (error) {
        res.status(500).json(error.message)
    }
}


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