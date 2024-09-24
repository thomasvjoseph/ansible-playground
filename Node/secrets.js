const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

// Name of the secret in AWS Secrets Manager
const secret_name = process.env.SECRET_NAME; // Adjust this to your secret name
const region = process.env.AWS_REGION;

// Create a Secrets Manager client
const client = new SecretsManagerClient({
  region: region, // Adjust the region to your AWS region
});

async function getSecret() {
  let response;
  
  try {
    // Fetch the secret value
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // Defaults to AWSCURRENT
      })
    );

    // Extract the secret string
    const secret = response.SecretString;
    const parsedSecret = JSON.parse(secret); // Assuming the secret is stored in JSON format

    // Extract specific values, like the DB name
    const dbName = parsedSecret.database_name; // Adjust 'dbname' to your key in the secret

    console.log("Database Name:", dbName);

    // Use the dbName or any other secret in your application logic
    return dbName;
  } catch (error) {
    console.error("Error fetching secret:", error);
    throw error;
  }
}

// Call the function to retrieve the secret
getSecret().then(dbName => {
  // Use the db name here (or elsewhere in your app)
  console.log("Fetched DB Name:", dbName);
});