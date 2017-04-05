/**
 * Created by Administrator on 2016/10/20.
 */

define(function(){
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
    return {
        lazy:lazy
    }
});