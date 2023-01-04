module.exports = class Application {
    #express = require("express")
    #app = this.#express()
    constructor(PORT , DB_URL){
        this.ConfigDataBase(DB_URL)
        this.ConfigApplication()
        this.CreateServer(PORT)
        this.CreateRoutes()
        this.ErrorHandler()
    }
    ConfigApplication(){
        const path = require("path")
        this.#app.use(this.#express.json())
        this.#app.use(this.#express.urlencoded({extended : true}))
        this.#app.use(this.#express.static(path.join(__dirname , ".." , "public")))
    }
    CreateServer(PORT){
        const http = require("http")
        const Server = http.createServer(this.#app)
        Server.listen(PORT , () => {
            console.log(`Server run on http://localhost:${PORT}`)
        })
    }
    ConfigDataBase(DB_URL){
        const moongos = require("mongoose")
        moongos.connect(DB_URL , (error) => {
            if(error) throw {error}
            return console.log("Connect to DB was successful...")
        })
    }
    ErrorHandler(){
        this.#app.use((req , res , next) => {
            return res.status(404).json({
                status : 404 ,
                syccess : false ,
                message : "The desired address was not found!"
            })
        })        
        this.#app.use((error , req , res , next) => {
            const status = error?.status || 500
            const message = error?.message || "Internal server error"
            return res.status(status).json({
                status,
                success : false ,
                message
            })
        })
    }
    CreateRoutes(){
    this.#app.get("/" , (req , res , next) => {
        return res.json({
            message : "this is a new project "
        })
    })
    }
}