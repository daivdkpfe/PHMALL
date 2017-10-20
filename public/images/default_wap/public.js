var return_date=function (date) {
    var s=new Date(parseInt(date) *1000 ).toLocaleString().replace(/\d{1,2}:\d{1,2}:\d{1,2}$/,'').replace(' ','');
    return s;
};
