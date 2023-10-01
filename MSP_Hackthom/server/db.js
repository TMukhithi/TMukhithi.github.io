// Import the 'Pool' class from the 'pg' library
const Pool = require("pg").Pool;

// Create a new instance of the 'Pool' class with connection details
const pool = new Pool({
    user : "postgres",          // PostgreSQL username
    password : "Agent@001",     // PostgreSQL password
    host : "localhost",         // PostgreSQL server host
    port : "4800",              // PostgreSQL server port
    database : "perntodo"      // PostgreSQL database name
})

// Export the 'pool' instance to be used in other parts of the code
module.exports = pool;
