// Import the Express.js framework
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const dns = require('dns');
const qr = require('qrcode');
const uuid = require("uuid"); // Import the uuid library, this library is to generate unique ids
const axios = require("axios");

// Create an instance of the Express application
const app = express();


// getting the information from the front end/user
app.use(cors());
app.use(express.json());

// Set a global variable
global.fullUrl = "";
global.ipAddress;


// Define the port number to listen on; use the provided PORT environment variable or default to 4000
//const PORT = process.env.PORT || 4000;
const PORT = 3000

// Additional data to send along with the ID (defined at the top level)
const additionalData = {
  payment_amount: 500,
  pay_status: "successful",
};

var i = 2;
array = [];

// Define a route for handling GET requests to "/id"
app.get("/generateID", async (req, res) => {
 
  try {
    i = i + 1;
    u={}
    u[i]=false;
    array[i]=u;

    id = array[i];

    if (!id) {
      // If the ID is not provided in the query parameters, send an error response
      return res.status(400).json({ error: "ID parameter is missing" });
    }

    // Process the retrieved ID as needed
    console.log("Retrieved ID:", id);

    // Send a response to the client with the retrieved ID
    res.json({ id });

    console.log("ID sent to /driver-receive-ID. This is the driver's screen");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// gettting the list of generated ids for the driver
app.get("/listID",async(req, res) => {
  // this is the list of ID for the passenger in the taxi
  i = i + 1;
  u={}
  u[i]=false;
  array[i]=u;
  res.json(array)
  console.log("List of IDs successfully sent to the driver!");

});



// creating a todo or putting money onto the app
app.post("/pay", async(req, res) => {
  try {
    // TODO: Implement logic to pay more
    console.log(req.body);
    const payment_data = req.body.amount;
    console.log(payment_data);
    const id = req.body.id;

    u = {};
    var temp = array['id'];
    u[i] = true;

     // Call the paymentProcessor function to handle the payment logic
     const paymentResult = await paymentProcessor(paymentData);

    // Respond to the client with the payment result
    res.json(paymentResult);


     // Construct the full URL within the route handler
     const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
     console.log(fullUrl);

  } catch (error) {
    console.log(error.message);
  }
})

// helper function for payment
const paymentProcessor = async (paymentData) => {
  // Implement payment processing logic here
  // For example, interact with a payment gateway, validate payment, and update the app's data
  // If successful, return a success response; otherwise, throw an error
  // ...
  if (paymentData > 0) {
    // Payment successful
    return { success: true, message: 'Payment successful' };
  } else {
    // Payment failed
    throw new Error('Payment failed');
  }
};


// Start the Express application and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Define a route handler for the root path ("/") using the GET method
app.get('/', function(req, res) {
  // Retrieve the IP address of the client making the request
  //const ipAddress = req.socket.remoteAddress;
  const ipAddress = req.ip;
  //print(ipAddress);
  // Send the IP address as a response to the client+
  console.log(ipAddress +"=========");

  res.send(ipAddress);

  // Log the IP address to the server's console for debugging purposes
});
ref = [{"1":{"username":"John", "paid":false},"amount":500}, {"2":{"username":"Ismail", "paid":false, "amount":200}}, {"3":{"usernaname":"Doe","paid":"false", "amount":350}}];
data = "www.example.com/";





// Define a route handler for POST requests
app.post("/generate-unique-id", (req, res) => {
  // Generate a unique ID using the uuid library
  const uniqueId = uuid.v4(); // v4 generates a random UUID

  // Send the unique ID as the response
  res.json({ id: uniqueId });

  console.log(uniqueId);
});


axios.post("http://localhost:4800/generate-unique-id")
  .then(response => {
    // Log the generated unique ID to the console
    console.log("Generated Unique ID:", response.data.id);
  })
  .catch(error => {
    console.error("Error:", error);
  });


 // Generate the QR code
// temp data1 
//tempdata1 = "http://localhost:8081/"
tempdata2 = "http://localhost:3001/"
tempdata3 = "https://www.sumbandila.org/residential-program"


 qr.toFile('qrcode.png', tempdata3, (err) => {

  if (err) throw err;
  console.log('QR code generated!');
  });

 