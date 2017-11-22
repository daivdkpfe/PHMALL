
import galert from './alert.vue'


function instance(title,value,btn,okcallback,cancelcakkback){
    
    var vueObj = new Vue({
        template:`<galert :alert_show="alert_show" title="`+title+`" value="`+value+`" :btn="btn" v-on:clickok="clickok" v-on:clickcancel="clickcancel"></galert>`,
        components:{galert},
        data: {
            alert_show:false,
            btn:[]
        },
        methods:{
            clickok:function(){
                okcallback('ok');
            },
            clickcancel:function(){
                
                cancelcakkback('cancel')
            }
        },
        mounted:function(){
           this.btn=btn;
            this.alert_show = true;
            console.log(this.btn);
        }
    });
   
    const component = vueObj.$mount();
    document.body.appendChild(component.$el);
    //在文档之外渲染并且随后挂载
    //参考文档https://cn.vuejs.org/v2/api/#vm-mount
}
// export default alertshow;
export default function(){
    Vue.prototype.$alertshow=function(_alert){
        var title='提示';
        var value="我是提示";
        var btn=['确定'];
        var okcallback=function(){};
        var cancelcakkback=function(){};
        if(typeof(_alert)=='string')
        {
            var value=_alert;
        }
        if(typeof(_alert)=='object'){
            if(typeof(_alert.title)!='undefined'){
                title=_alert.title;
            }
            if(typeof(_alert.value)!='undefined'){
                value=_alert.value;
            }
            if(typeof(_alert.btn)!='undefined'){
                btn=_alert.btn;
            }
            if(typeof(_alert.okcallback)!='undefined'){
                okcallback=_alert.okcallback;
            }
            if(typeof(_alert.cancelcakkback)!='undefined'){
                cancelcakkback=_alert.cancelcakkback;
            }
        }
        instance(title,value,btn,okcallback,cancelcakkback);
    }
} 



