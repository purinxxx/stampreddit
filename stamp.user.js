// ==UserScript==
// @name    redditスタンプ入力支援
// @namespace    http://dnote.biz/
// @version    1.0
// @description    スタンプが使えるサブレのコメント入力部分上部の「stamp」クリックして選んでください
// @author    purinxxx
// @match    http://www.reddit.com/r/*
// @grant    none
// @require    http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js
// ==/UserScript==

//corsを回避してサブレのcssにアクセスするため私の鯖のphpに寄り道します
//phpではcssをfilegetcontentして正規表現でスタンプに使われてるコマンドを抜き出したものをリンクにしてechoしてます
var stamp = "http://dnote.biz/cors/?url=" + $('link[title="applied_subreddit_stylesheet"]').attr('href');
$.ajax({
    type: 'GET',
    url: stamp,
    dataType: 'html',
    success: function(data) {
        //スタンプがあるサブレのみ
        if(data!=''){
            $('body').after('<div id="stamp" style="display: none;"></div>')
            $('#stamp').append(data);
            $('body .md textarea').before('<a class="box" href="#stamp">stamp</a>');
            $('head link:last').after('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css">')
            $('.box').fancybox({
                fitToView   : false,
                width       : '80%',
                height      : '80%',
                autoSize    : false,
                closeClick  : false,
                openEffect  : 'none',
                closeEffect : 'none'
            });
            $('.box').click(function () {
                var oya = $(this).parents('form');
                target = "#" + $(oya[0]).attr("id") + " .usertext-edit .md textarea";
            });
            $('#stamp a').click(function () {
                var which = $(this).attr('href');
                var text = $(target).val() + '[](' + which + ')';
                $(target).val(text);
                javascript:jQuery.fancybox.close();
            });
        }
    }
});
