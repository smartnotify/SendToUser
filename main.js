{\rtf1\ansi\ansicpg1252\cocoartf1348\cocoasubrtf170
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww21000\viewh11340\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f0\fs24 \cf0 \
function SendDeviceMessages (content)\{\
        \
    var httpOut = require('https');\
    \
    var  jsonObject = \{\
    "Sender_ID" : \'93XXXXXXXXXXXXXXXXXXXXXXXX\'94,   // Your user ID\
    "Sender_Key" : \'93XXXXXXXXXXXXXXXXX\'94,  //Your user Key\
    "Method_ID": 2,  //In this example this is a text message, see notes for all the keys\
		"Content": content,\
		"Title": "SmartNotify Demo",\
		"TrackLinks": false,\
		"BroadcastOperation": 2,  //This is a group broadcast.\
		"OutboundPhoneNumber": \'9313039004243\'94,   //Add your SmartNotify based number, it will be used to send SMS if needed\
		"TargetGroup": 007,  //The group you want to reach, remember that group can be one person as well\
    \}; \
    jsonObject = JSON.stringify(jsonObject)\
    \
    //jsonObject = EncodeRequest(jsonObject);\
 \
    // prepare the header\
var postheaders = \{\
    'Content-Type': 'application/json',\
    'Content-Length': Buffer.byteLength(jsonObject, 'utf8')\
\};\
\
  //  console.dir (jsonObject);\
    \
// the post options\
var optionspost = \{\
    host : 'smartnotifyapi.azurewebsites.net',    \
    port : 443,  //80\
    path : '/api/broadcasts/broadcast/post',\
    method : 'POST',\
    agent: false,\
    headers : postheaders\
\};\
 \
//console.info('Options prepared:');\
//console.info(optionspost);\
console.info('Do the POST call');\
    \
// do the POST call\
    var bodyChunks = [];\
var reqPost = httpOut.request(optionspost, function(res) \{  \
    console.log("statusCode: ", res.statusCode);\
    // uncomment it for header details\
//    console.log("headers Received: ", res.headers);\
    \
    res.on('data', function(d) \{\
        bodyChunks.push(d);\
        //console.dir(d);\
        process.stdout.write(d);\
        \
    \}).on('end', function() \{\
        \
          \
      \});\
\});\
 \
// write the json data\
reqPost.write(jsonObject);\
reqPost.end();\
reqPost.on('error', function(e) \{\
    console.error(e);\
\});\
    \
    \
\}\
\
  \
}