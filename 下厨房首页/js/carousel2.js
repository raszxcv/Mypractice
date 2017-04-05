/**
 * Created by Administrator on 2016/10/12.
 */

define(function(){
    var Carousel2=function($node){
        this.$node=$node,
            this.$ct=$node.find('.img-ct'),
            this.imgwidthsub=this.$ct.find('li').size(),
            this.imgwidth=this.$ct.find('li').width(),
            this.$pre=this.$node.find('.pre-2'),
            this.$next=this.$node.find('.next-2');
        this.$ct.css({'width':this.imgwidthsub*this.imgwidth});
        this.lock = false;
        this.curIdx =0;
        this.pos1 = $node.find('.position1');
        this.pos2 = $node.find('.position2');
        this.bind();
        this.$pre.hide();
        this.pos1.hide();
    };

    Carousel2.prototype = {
        bind:function(){
            var $me = this;
            this.$next.on('click',function(){
                $me.playnext();
            });
            this.$pre.on('click',function(){
                $me.playpre();
            })
        },
        playnext:function(){
            var $me = this;
            if(this.lock){
                return
            }
            this.lock = true;
            var $ct = this.$ct;
            $ct.animate({left:'-='+(this.imgwidth)},function(){
                $me.curIdx+=1;
                if($me.curIdx===4){
                    $me.$next.hide();
                    $me.pos1.show();
                }else if($me.curIdx<4){
                    $me.$next.show();
                    $me.pos1.hide();
                }
                if($me.curIdx>0){
                    $me.$pre.css('display','inline-block');
                    $me.pos2.hide();
                }
                $me.lock=false;
            });
        },
        playpre:function(){
            var $me = this;
            if(this.lock == true){
                return
            }
            this.lock = true;
            var $ct = this.$ct;
            $ct.animate({left:'+='+(this.imgwidth)},function(){
                $me.curIdx-=1;
                if($me.curIdx===0){
                    $me.$pre.hide();
                    $me.pos2.show();
                }else if($me.curIdx>0){
                    $me.$pre.css('display','inline-block');
                    $me.pos2.hide();
                }
                if($me.curIdx<4){
                    $me.$next.show();
                    $me.pos1.hide();
                }

                $me.lock=false;
            });
        }
    };
    return {
        carousel2:Carousel2
    }
});
