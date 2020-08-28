var http    = require( "http" )
var Cookies = require( "cookies" )
var mongoose = require( "mongoose" )
var uuidv4 = require( "uuid/v4" )
var port = process.env.PORT || 3000
var login = process.env.LOGIN
mongoose.connect('mongodb+srv://' + login + '@tokenchain.wei6e.mongodb.net/tokenchain?retryWrites=true&w=majority')
var User = require('./user-model')

server = http.createServer( function( req, res ) {
    var cookies = new Cookies( req, res )
    if (req.url == "/favicon.ico") {
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.end('\n')
        return
    }
    var token = cookies.get("token")
    User.find({
        token: token
    }).find((err, users) =>{
        var foundUser = users[0]
        if (!foundUser) {
            res.writeHead( 200, { "Content-Type": "text/plain" } )
            res.end( "Credentials not valid" )
            return
        }
        if (req.url == "/") {
            res.writeHead(200, {"Content-Type": "text/html"})
            res.end(`
            <html>
            <body>
            <p>Name: ` + foundUser.name + `</p>
            <p>Data: ` + foundUser.data + `</p>
            <a href="/increment">increment</a>
            <a href="/decrement">decrement</a>
            </body>
            </html>
            `)
        }
        else if (req.url == "/increment") {
            var newToken = uuidv4()
            cookies.set("token", newToken)
            foundUser.token = newToken
            foundUser.data += 1
            foundUser.save((err) => {
                if (err)
                    console.log(err)
            })
            res.writeHead( 302, { "Location": "/" } )
            res.end()
        }
        else if (req.url == "/decrement") {
            var newToken = uuidv4()
            cookies.set("token", newToken)
            foundUser.token = newToken
            foundUser.data -= 1
            foundUser.save((err) => {
                if (err)
                    console.log(err)
            })
            res.writeHead( 302, { "Location": "/" } )
            res.end()
        }
    })
}).listen(port);
