const get404 = (req,res,next)=> {
    res.status(404).send({success:true,msg:'Not Found!'});
}

module.exports = {
    get404
}