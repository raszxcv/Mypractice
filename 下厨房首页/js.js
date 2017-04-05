
function Carousel($node){
        this.$node=$node,
        this.$ct=$node.find('.img-ct'),
        this.imgwidthsub=this.$ct.find('li').size(),
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
}

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
    setnav:function(){
        this.$car_nav.find('li').removeClass('setcolor');
        this.$car_nav.find('li').eq(this.curidx).addClass('setcolor');
    }
};

$node1 = $('.carousel-1').eq(0);


var carousel1 = new Carousel($node1);

    setInterval(function(){
       carousel1.playnext();
    },2000);


function Carousel2($node){
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
}

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

var $node2 = new Carousel2($('.carousel-2'))

var $gotop = $('<div class = "go-top"></div>');
$('body').append($gotop);
$gotop.hide();
$(window).on('scroll',function(){
    var scrollTop = $(this).scrollTop();
    if(scrollTop>500){
        $gotop.show();
    }else{
        $gotop.hide();
    }

});

$gotop.on('click',function(){
    $(window).scrollTop(0);
});

function lazy($node){
    this.lazyimg=$node.find('img');
    this.check(this.lazyimg);
    this.checkWin($node);
}

 lazy.prototype={
    checkWin:function($node){
        var clock;
        var $me =this;
        $(window).on('scroll',function(){
            if(clock == true){
                clearTimeout(clock)
            }
            clock = setTimeout(function(){
                $me.check($me.lazyimg);
            },500)

        })
    },
    check:function($node){
        $me=this;
        $node.each(function(){
            $cur = $(this);
            if($me.isShow($cur)){
                $me.showimg($cur)
            }
        });
    },
    isShow:function($cur){
        var scrollTop = $(window).scrollTop(),
            winH      = $(window).height(),
            top       = $cur.offset().top;

        if((scrollTop+winH)>top){
            return true
        }else{
            return false
        }
    },
    showimg:function($cur){
        $cur.attr('src',$cur.attr('data-img'));
    }
};
var lazyy = new lazy($('body'));



