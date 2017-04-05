/**
 * Created by Administrator on 2016/10/12.
 */

define(function(){
       var Carousel = function($node){
            this.$node=$node;
            this.$ct=$node.find('.img-ct');
            this.imgwidthsub=this.$ct.find('li').size();
            this.imgwidth=this.$ct.find('li').width();
            this.$item = this.$ct.children();
            this.$pre=this.$node.find('.pre');
            this.$next=this.$node.find('.next');
            this.$ct.prepend(this.$item.last().clone());
            this.$ct.append(this.$item.first().clone());
            this.imgnewwidth = this.$ct.children().size();
            this.$ct.css({'left':0-this.imgwidth,'width':this.imgnewwidth*this.imgwidth});
            this.lock = false;
            this.curidx = 0;
            this.$car_nav = $node.find('.carousel-nav');
            this.bind();
            this.autoplay();
        };

        Carousel.prototype = {
            bind:function(){
                var $me = this;
                this.$next.on('click',function(){
                    $me.playnext();
                });
                this.$pre.on('click',function(){
                    $me.playpre();
                });
                this.$car_nav.find('li').on('click',function(){
                    var idx = $(this).index();
                    if(idx>$me.curidx){
                        $me.playnext(idx - $me.curidx);

                    }else{
                        $me.playpre($me.curidx - idx);
                    }
                })
            },
            playnext:function(idx){
                var Idx = idx || 1 ;
                var $me = this;
                if(this.lock){
                    return
                }
                this.lock = true;
                var $ct = this.$ct;
                $ct.animate({left:'-='+(Idx*this.imgwidth)},function(){
                    $me.curidx+=Idx;
                    if($me.curidx === $me.imgwidthsub){
                        $me.$ct.css({left:0-$me.imgwidth});
                        $me.curidx = 0;
                    }
                    $me.lock=false;
                    $me.setnav();
                });
            },
            playpre:function(idx){
                var Idx = idx || 1 ;
                var $me = this;
                if(this.lock == true){
                    return
                }
                this.lock = true;
                var $ct = this.$ct;
                $ct.animate({left: '+='+(Idx*this.imgwidth)},function(){
                    $me.curidx-=Idx;
                    if(this.curidx === (-1)){
                        $ct.css({left:0-$me.imgwidth*$me.imgwidthsub});
                        $me.curidx = 2;
                    }
                    $me.lock=false;
                    $me.setnav();
                })
            },
            autoplay:function(){
                var $me=this;
                setInterval(function(){
                    $me.playnext();
                },2000);
            },
            setnav:function(){
                this.$car_nav.find('li').removeClass('setcolor');
                this.$car_nav.find('li').eq(this.curidx).addClass('setcolor');
            }
        };
        return {
            Carousel:Carousel
        }
});






