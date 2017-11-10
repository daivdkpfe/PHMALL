module.exports={
    setcookie: function (name, value, days) {
        
            var d = new Date;
        
            d.setTime(d.getTime() + 24*60*60*1000*days);
        
            window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        }
    ,
        getsetcookie: function (name) {
        
            var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        
            return v ? v[2] : null;
        
        }
        ,
        deletesetcookie: function (name) {
        
            this.set(name, '', -1);
        
        },
       return_date:function (date) {
            var s=new Date(parseInt(date) *1000 ).toLocaleString().replace(/\d{1,2}:\d{1,2}:\d{1,2}$/,'').replace(' ','');
            return s;
        },
        get_now_time:function(){
            var validity=new Date().getTime();
            return Math.round(validity/1000);//有效期
        }
}
