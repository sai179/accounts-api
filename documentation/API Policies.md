The APIs implement the OAuth 2.0 for secure authentication and authorization. The OAuth 2.0 protocol requires an access token to be submitted with all API calls. There are multiple ways to implement OAuth 2.0 authentication, for most use case we recommend using Client Code Flow. If you would like to use a different method to implement OAuth 2.0 authentication, please contact API Support at api@support.com

All communication with our servers must be over TLS (https://).

## Step 1:Get your authorization token

To get an authentication token, you will need the client_id and client_secret for your application, these can be found on the developer portal My Application page: [https://anypoint.mulesoft.com/exchange/portals/org/applications/](https://anypoint.mulesoft.com/exchange/portals/org/applications/)

You might need to log in using your Anypoint credentials.

The first step is to obtain an authorization token. This is done by making a simple request to our authentication server with your application's client_is and client_secret.

```
$ curl -d "grant_type=client_credentials\
&client_id={YOUR APPLICATION'S CLIENT_ID} \
&client_secret={YOUR APPLICATION'S CLIENT_SECRET}" \
https://oauth.org.com/as/token.oauth2
```

You will receive a response like this:

```
{
"access_token": "{ACCESS TOKEN}",
    "token_type": "Bearer",
    "expires_in": 86399
}
```

## Response Parameters

The following lists the required fields in the /labels/domestic response message.

Parameter    Description

access_token    OAuth 2.0 access token that you will use for subsequent API calls

token_type    This is the type of token generated. The default is Bearer token, which can be understood as "give access to whoever brings the bearer token."

expires_in    Duration that the access token is valid for, in seconds. The default value is 86399 seconds (24 hours). It is the API consumer responsibility to manage token expiry.

## Step 2: Use your authorisation token in an API call

Pass the access_token returned in the response in the Authorization header with the type Bearer to make requests on behalf of a user:

```
    curl -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
'https://api.domain.com/{API CALL}'
```
