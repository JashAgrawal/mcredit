import apiService from "./axios"

export const addCustomer = async (data:any)=>{
  try{
    const res = await apiService.post("/add-customer",data);
    return res.data
  }catch(e){
    throw e
  }
}
export const addTransaction = async (data:any,customerId:string)=>{
  try{
    const res = await apiService.post("/add-transaction/"+customerId,data);
    return res.data
  }catch(e){
    throw e
  }
}
export const getCustomer = async ()=>{
  try{
    const res = await apiService.get("/get-customers");
    return res.data
  }catch(e){
    throw e
  }
}
export const getTransactions = async (customerId:string)=>{
  try{
    const res = await apiService.get("/get-transactions/"+customerId);
    return res.data
  }catch(e){
    throw e
  }
}