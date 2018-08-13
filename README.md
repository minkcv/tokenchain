# Token Chain
Token Chain is a security model that uses a frequently changing token for authentication.
The frequency with which the token changes is free for the server to determine. For example, the server could issue a new token every time the client views (reads) data, or could issue a new token less frequently such as only when the client modifies (writes) data.

In this example context the word "token" refers to a string value stored in a cookie but this model could be implemented in clients other than browsers.

The word "site" is used to refer to a website but this model could use a server other than http.

### How it works
1. The client either signs up on the site and is issued a token, or the client receives the token elsewhere, possibly from another application, or offline media.
2. The client visits the site when they have their token set to the initially issued value from step 1.
3. The client does an action that causes the server to issue a new token. This could be something like changing a setting, sending a message, liking a post, or transferring money.
4. The server no longer allows the client to perform actions with the old token and sends the new token to the client.
5. The client can do another action, but only with the new token. The previous tokens have no value and can be discarded.
6. If the server allows it, the client can view information with the same token multiple times without having the server issue a new token, but it must be the latest token.

### Working example
The code in this repository contains a working example of this model using http, cookies and requires a database to be set up. 