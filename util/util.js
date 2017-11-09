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
        
        }
}
