const getDashboard = (req,res)=>{
    res.render('index')
}
const getForm = (req,res)=>{
    res.render('form')
}

module.exports = {
    getDashboard,
    getForm
}