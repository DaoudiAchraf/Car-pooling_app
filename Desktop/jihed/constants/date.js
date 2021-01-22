export default convert= (dateTime)=>{

    return {
        date:dateTime.split("T")[0], 
        time:dateTime.split("T")[1].slice(0,5)
    }


}