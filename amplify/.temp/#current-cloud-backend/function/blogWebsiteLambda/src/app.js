/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const { request } = require('http')
const { v4: uuidv4 } = require('uuid')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "blogWebsiteTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/blogs";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

const getUserId = req => {
  try {
    const reqContext = req.apiGateway.event.reqContext;
    const authProvider = reqContext.identity.cognitoAuthenticationProvider;
    return authProvider ? authProvider.split(":CognitoSignIn:").pop() : "UNAUTH";
  } catch (error) {
    return 'UNAUTH'
  }
}

/********************************
 * HTTP Get method for list objects *
 ********************************/
app.get(path + hashKeyPath, function(req, res) {
  // const condition = {}
  // condition[partitionKeyName] = {
  //   ComparisonOperator: 'EQ'
  // }

  // if (userIdPresent && req.apiGateway) {
  //   condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  // } else {
  //   try {
  //     condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
  //   } catch(err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Wrong column type ' + err});
  //   }
  // }

  let queryParams = {
    TableName: tableName
  }

  console.log("Starts to run")
  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
  console.log("Does it run?")

});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  // const params = {};
  // if (userIdPresent && req.apiGateway) {
  //   params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  // } else {
  //   params[partitionKeyName] = req.params[partitionKeyName];
  //   try {
  //     params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
  //   } catch(err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Wrong column type ' + err});
  //   }
  // }
  // if (hasSortKey) {
  //   try {
  //     params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
  //   } catch(err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Wrong column type ' + err});
  //   }
  // }

  let getItemParams = {
    TableName: tableName,
    Key: req.params.id
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
});




/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function(req, res) {
  const timestamp = new Date().toISOString();
  // if (userIdPresent) {
  //   req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  // }

  let putItemParams = {
    TableName: tableName,
    // Item: req.body
    Item: {
      ...req.body,
      id: uuidv4(),
      createdAt: timestamp,
      updatedAt: timestamp,
      userId: getUserId(req),
    }
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});


/************************************
* HTTP put method for insert object *
*************************************/


// app.put(path, function(req, res) {
//   if (userIdPresent) {
//     req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   }

//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body
//   }
//   dynamodb.put(putItemParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({ error: err, url: req.url, body: req.body });
//     } else{
//       res.json({ success: 'put call succeed!', url: req.url, data: data })
//     }
//   });
// });

app.put(path, function(req, res) {

  // will have to change to my code
  const timestamp = new Date().toISOString();

  let putItemParams = {
    TableName: tableName,
    Key: { id: req.body.id },
    ExpressionAttributeNames: { "#text" : "text"},
    ExpressionAttributeValues: {},
    ReturnValues: "UPDATED_NEW"
  };

  putItemParams.UpdateExpression = "SET";
  
  if(req.body.text) {
    putItemParams.ExpressionAttributeValues[":text"] = req.body.text;
    putItemParams.UpdateExpression += ":text, ";
  }
  if(req.body.complete) {
    putItemParams.ExpressionAttributeValues[':complete0'] = req.body.complete;
    putItemParams.UpdateExpression += 'complete = :complete, ';
  }
  if(req.body.text || req.body.complete) {
    putItemParams.ExpressionAttributeValues[":updatedAt"] = timestamp;
    putItemParams.UpdateExpression += 'updatedAt = :updatedAt';
  }

  dynamodb.update(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else{
      res.json({ success: 'put call succeed!', url: req.url, data: data })
    }
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  // const params = {};
  // if (userIdPresent && req.apiGateway) {
  //   params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  // } else {
  //   params[partitionKeyName] = req.params[partitionKeyName];
  //    try {
  //     params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
  //   } catch(err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Wrong column type ' + err});
  //   }
  // }
  // if (hasSortKey) {
  //   try {
  //     params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
  //   } catch(err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Wrong column type ' + err});
  //   }
  // }

  let removeItemParams = {
    TableName: tableName,
    // Key: params
    Key: { id: req.params.id }
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
