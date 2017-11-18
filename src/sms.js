import Vue from 'vue';
import iView from 'iview';
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'

import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import content from '../components/content.vue'
import touch from '../components/gxc/touch.vue'
import threesms from '../components/threesms.vue'
import release from '../components/release.vue'


Vue.use(iView);
var lang=lang_ch;

    Vue.component("top", header);
    Vue.component("contentuser", content);
    Vue.component("touch", touch);
    Vue.component('three',threesms);
    Vue.component('release',release);

    var page=new Vue({
        el:'.big_div',
        data:{
            x:0,
            y:0,
            startx:0, 
            starty:0,
            sms_list:[],
            arr:['1','2',3]
        },
        methods:{
            sss:function(){
                alert("sss");
            },
            sb:function(x){
                this.x=x.changedTouches["0"].clientX;
                this.y=x.changedTouches["0"].clientY;
            },
            start:function(x,a){
                this.startx=x.changedTouches["0"].clientX;
                this.starty=x.changedTouches["0"].clientY;
            },
            end:function(x,a){
                if(this.startx-x.changedTouches["0"].clientX>0){
                    alert("左移");
                }
                else if (this.startx-x.changedTouches["0"].clientX<0){
                    alert("右移");
                }
                if(this.starty-x.changedTouches["0"].clientY>0){
                    alert("上移");
                }
                else if (this.starty-x.changedTouches["0"].clientY<0){
                    alert("下移");
                }
                
                
            }
        },
        mounted:function(){
            var that=this;
           
           $.post('./sms',{},function(data){
            
            console.log(data);  
                 
                data=data.data;
                alert(data.length); 
                
                for (var i=0;i<data.length;i++)
                {
                    alert(i);
                }
               /* data.forEach(function(val,index){
                   data[index].reg_date=return_date(val.reg_date);
                  
               });
               
               that.sms_list=data; */
               

           })
        }
    })
