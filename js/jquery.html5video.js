var first;
$(document).ready( function (){
    var num = json.path.length;
    $.each(json.path,function(index,src){
        var $video = make_player(index,src);
        var next_id = index + 1;
        if(next_id == num) next_id = 0;
        $video.on("ended",function(){
            $(this).hide();
            $(this).get(0).currentTime = 0;
            var $next_video = $('#video' + next_id);
            info_data_set($next_video);
            $next_video.show().get(0).play();
        });
    });
    var help = $('<div id="help"><div id="etc"></div>[ctrl + r] or [f5]: 再読み込み<br> [p]: 再生<br>[s]：一時停止<br>[r]:リセット<br>[h]:ヘルプ表示/非表示<br>[i]:ヘルプ表示時に動画情報表示/非表示<div id="info"></div></div>');
    $('body').append(help);
    first_video_set();
    $(window).on("keydown", function (e){
        video_controler(e);
    });
    $('body').css({'background-color':'#000000'});
});

function make_player(index,src){
    var video = $("<video id='video" + index + "' controles preload ></video>");
    source = $("<source src='" + src + "' type='video/mp4'>");
    video.append(source);
    $("body").append(video);
    return video;
}

function first_video_set($video){
    if($video){
        $video.hide();
        $video.get(0).pause();
        $video.get(0).currentTime = 0;
    }
    var timeline = timeline_checker(json.schedule);
    var first = timeline.first;
    var etc = timeline.etc;
    var $first_video = $("#video" + first);
    info_data_set($first_video);
    $('#etc').html(etc);
    $first_video.get(0).currentTime = 0;
    $first_video.show();
}

function video_controler(e){
    var $video = $("video:visible");
    var video = $video.get(0);
    info_data_set($video);
    // p key
    if(e.keyCode === 80){
          $('#help').hide();
        if(video.paused){
            video.play();
        }
    }
    // s key
    if(e.keyCode === 83){
        if(video.played){
            video.pause();
            console.log('paused');
        }
    }
    // r key
    if(e.keyCode === 82){
            $('#help').show();
            first_video_set($video);
    }
    // h key
    if(e.keyCode === 72){
        if( $('#help').css('display') == 'block' ){
            $('#help').hide();
        } else {
            $('#help').show();
        }
    }
    // i key
    if(e.keyCode === 73){
        if( $('#info').css('display') == 'block' ){
            $('#info').hide();
        } else {
            $('#info').show();
        }
    }
}

function timeline_checker(schedule) {
    var now = new Date();
    var st = new Date();
    var ed = new Date();
    var first = {"first":"0","etc":""};
    $.each(schedule,function (index,timeline){

        var tmp_st = timeline.st.split(/:/);

        st.setSeconds('00');
        st.setMinutes(tmp_st[1]);
        st.setHours(tmp_st[0]);
        var tmp_ed = timeline.ed.split(/:/);
        ed.setSeconds('00');
        ed.setMinutes(tmp_ed[1]);
        ed.setHours(tmp_ed[0]);

        if(st < now && now < ed ){
            first = timeline;
            return false;
        }
    });
    return first;
}

function info_data_set($video){
    var $source = $video.find('source:first');
    $('#info').html(
        '<ul><li>id:'
        + $video.attr('id')
        + '</li><li>src:'
        + $source.attr('src')
        + '</li></ul>'
    );
}