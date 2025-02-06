function fetchData(callback){
    const num = Math.random();
    let isSuccess = num >0.5;
    setTimeout(()=>{
        const data=["yashodhan","prasad","devdhar"]
        getData(isSuccess,data);
    },2000);
};

function getData(isSuccess,data){
    if(isSuccess){
        console.log(data);
    }else{
        console.log("Error: Unable to fetch data from server");
    }
};

fetchData(getData);