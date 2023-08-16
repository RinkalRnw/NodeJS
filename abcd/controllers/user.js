const getDashboard = async(req,res) => {
    res.render('index')
    
}
const getAllUserData = async() => {
    console.log("Userdata Dashboard calling")
}
module.exports = {
    getDashboard,getAllUserData
}