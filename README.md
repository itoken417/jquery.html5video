# HTML5 player HTML

- list.json ファイルに記載してあるpathの配列を元に、html5 video タグ生成
- listファイルに記載してあるpathの配列の順番に再生
- 期間指定で、先頭のmp4を指定
    - 何時から何時まで
    - 返却されたpathの配列のindex番号を元に、先頭指定
- キーボードで操作
- 現状は、これで十分。
    - 時間調整は、リストで同じ動画入れればよい？
- Google Chrome でローカルAjax 動かなかったので修正

## Jqueryを使用しています。

- used jquery
    -  jquery-3.2.1.min.js

### TODO

jquery plugin 化

## 再生できる動画のタイプ

現在は、video/mp4 のみ

## キーボード操作

|key|動作|詳細|
|----|----|----|
|[f5] or [ctrl + R]|reload|ブラウザの再読み込み、jsonファイル変更後使う|
|[p]|play|再生|
|[s]|parse|一時停止|
|[r]|reset|スケジュールに合わせて、先頭にリセット。スケジュール該当しない場合は、path配列の先頭|
|[h]|help|ヘルプ表示/非表示|
|[i]|info|ヘルプ表示時のみ動画情報表示/非表示|

## フォルダ構成（2017/06/20現在）

- play.html
- json/
    - list.json
- video/
    - list.jsonに記載したmp4ファイルを設置
- js/
    - jquery-3.2.1.min.js

## list.jsonについて

再生する動画の配列と、時間帯での頭出し

### list.json sample

    json = {
        "path":[
            "./video/kaeru.mp4",
            "./video/oni.mp4",
            "./video/hone.mp4"
        ],
        "schedule":[
            {"st":"09:00","ed":"11:00","first":0},
            {"st":"11:00","ed":"12:00","first":2},
            {"st":"12:00","ed":"14:00","first":1},
            {"st":"14:00","ed":"15:00","first":0},
            {"st":"15:00","ed":"16:30","first":2},
            {"st":"17:00","ed":"17:05","first":1},
            {"st":"17:55","ed":"18:00","first":0}
        ]
    }

## 項目説明

- path
    - mp4 へのパスを記載した配列
    - 配列の順序で繰り返す
- schedule
    - 「st」から「ed」の時間内で、最初にどのmp4を再生するかを記述
    - スケジュール時間外は、「pash」配列の先頭から


