var express = require('express')
const { insertProduct, SearchFunction, FindProduct, DeleteProduct, UpdateProduct, DisplayAll,SortByPriceASC } = require('./function')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.post('/new',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const supplier = req.body.txtSupplier
    const promotion = req.body.txtPromotion
    const description = req.body.txtDescription
    const picUrl = req.body.txtURL
    const newProduct = {
        name :name,
        price: Number.parseFloat(price),
        supplier: supplier,
        promotion: promotion,
        description: description,
        picture: picUrl
    }
    let id = await insertProduct(newProduct)
    console.log(id)
    res.redirect('/all')
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    let prod = await FindProduct(id)
    console.log(prod)
    res.render('edit',{'prod':prod})
})

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    await DeleteProduct(id)
    res.redirect('/all')
})

app.post('/update',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const supplier = req.body.txtSupplier
    const promotion = req.body.txtPromotion
    const description = req.body.txtDescription
    const picUrl = req.body.txtURL
    const product = {
        'name' :name,
        'price': Number.parseFloat(price),
        'supplier': supplier,
        'promotion': promotion,
        'description': description,
        'picture': picUrl
    }
    await UpdateProduct(id, product)
    res.redirect('/all')
})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/all', async (req,res)=>{
    let results = await DisplayAll()
    console.log(results)
    res.render('DisplayAll',{results:results})
})

app.get('/',async (req,res)=>{
    let results = await DisplayAll()
    console.log(results)
    res.render('homepage',{results:results})
})

app.post('/search', async (req,res)=>{
    let name = req.body.txtSearch
    let results = await SearchFunction(name)
    console.log(results)
    res.render('DisplayAll',{'results':results})
})

app.get('/SortByPrice', async (req,res)=>{
    let results = await SortByPriceASC()
    console.log(results)
    res.render('DisplayAll',{'results':results})
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is running!")





