const notFound =  (req,res,next) =>{
    const error = new Error (`Not found `);
    res.status(404)
    next(error)
 }
 const errorHandler= (err, req, res, next)=>{
    const statusCode  = res.statusCode == 200 ? 500: res.statusCode;
    res.status(statusCode).json({message : err.message , stack : process.env.NODE_ENV === 'production'})
    next()
 }
 module.exports = {notFound,errorHandler}