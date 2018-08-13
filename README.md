# Token Chain
Token Chain is a security model that uses a frequently changing token for authentication.
The frequency with which the token changes is open for the server to determine. For example, the server could issue a new token every time the client views (reads) data, or could issue a new token less frequently such as only when the client modifies (writes) data. One way to think of this model is that a user changes their password with every action that they take. 

In this example context the word "token" refers to a string value stored in a cookie but this model could be implemented in clients other than browsers.

The word "site" is used to refer to a website but this model could use a server other than http.

### How it works
1. The client either signs up on the site and is issued a token, or the client receives the token elsewhere, possibly from another application, or offline media.
2. The client visits the site when they have their token set to the initially issued value from step 1.
3. The client does an action that causes the server to issue a new token. This could be something like changing a setting, sending a message, liking a post, or transferring money.
4. The server no longer allows the client to perform actions with the old token and sends the new token to the client.
5. The client can do another action, but only with the new token. The previous tokens have no value and can be discarded.
6. If the server allows it, the client can view information with the same token multiple times without having the server issue a new token, but it must be the latest token.

### Advantages and Disadvantages
- The biggest advantage of this model and the reason I created it is that it reduces the ability for people to share access to one account. Once one person does an action that causes a token change, they have the burden of updating the token of any person that they wish to share the account with. This could be rather time consuming depending on the frequency with which the server changes tokens.

- Another advantage is that if an attacker steals a token they have not necessarily stolen the account. The stolen token must be the latest one and the attacker must cause a token change in order to cause a divergence from the previous token. If the attacker has an old token then it is of no use, as opposed to traditional passwords which can remain valid until explicitly changed. 

- The biggest disadvantage of this model is that it is difficult for a user to use multiple devices as they have the burden of moving the latest token from device to device.

- Another disadvantage is that if an attacker steals a token and causes a token change with that token, then the original user is locked out of their account. Though this model could be modified to include account recovery procedures to reset the token.


### Working example
The code in this repository contains a working (but very basic) example of this model using http, cookies and requires a database to be set up. 

A live version is available at 

[http://tokenchain.herokuapp.com/](http://tokenchain.herokuapp.com/)

If you have a cookie with the name `token` and a value that is a valid token then you can see the data value on the account and increment/decrement links. If you do not have a valid value or no value, then you will only see the message "Credentials not valid". In the interest of reducing load on my freely hosted projects I do not offer a automated method of signing up for an account, instead, I will let people that are interested contact me asking for a token.
