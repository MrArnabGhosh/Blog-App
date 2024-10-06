export const errorHandeller=(statusCode,massage)=>{
    const error = new Error(massage)
    error.statusCode=statusCode
    error.massage=massage
    return error
}