/*******************************************************************************
 * KindEditor - WYSIWYG HTML Editor for Internet
 * Copyright (C) 2006-2011 kindsoft.net
 *
 * @author Roddy <luolonghao@gmail.com>
 * @site http://www.kindsoft.net/
 * @licence http://www.kindsoft.net/license.php
 *******************************************************************************/

KindEditor.plugin('video', function (K) {
    var self = this, name = 'video', lang = self.lang('media' + '.');
    self.plugin.video = {
        edit: function () {
            var html = [
                '<div style="padding:20px;">',
                '<div class="ke-dialog-row">',
                '<label for="keUrl" style="width:60px;">&nbsp;</label>',
                '<span>请插入优酷视频或腾讯视频的分享地址</span>',
                '</div>',
                //url
                '<div class="ke-dialog-row">',
                '<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
                '<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:300px;" />',
                '</div>',
                //width
                '<div class="ke-dialog-row">',
                '<label for="keWidth" style="width:60px;">' + lang.width + '</label>',
                '<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="550" maxlength="4" />',
                '</div>',
                //height
                '<div class="ke-dialog-row">',
                '<label for="keHeight" style="width:60px;">' + lang.height + '</label>',
                '<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="400" maxlength="4" />',
                '</div>',
                '</div>'
            ].join('');
            var dialog = self.createDialog({
                    name: name,
                    width: 450,
                    height: 230,
                    title: self.lang(name),
                    body: html,
                    yesBtn: {
                        name: self.lang('yes'),
                        click: function (e) {
                            var url = K.trim(urlBox.val()),
                                width = widthBox.val(),
                                height = heightBox.val();
                            if (url == 'http://' || K.invalidUrl(url)) {
                                alert(self.lang('invalidUrl'));
                                urlBox[0].focus();
                                return;
                            }
                            if (!/^\d*$/.test(width)) {
                                alert(self.lang('invalidWidth'));
                                widthBox[0].focus();
                                return;
                            }
                            if (!/^\d*$/.test(height)) {
                                alert(self.lang('invalidHeight'));
                                heightBox[0].focus();
                                return;
                            }

                            var html = '';
                            if (/youku\.com/.test(url)) {
                                var arr = /id\_(.+)\.html/.exec(url);
                                html = '<iframe src="https://player.youku.com/embed/' + arr[1] + '" width="' + width + '" height="' + height + '" frameborder="0" webkit-playsinline playsinline x5-playsinline x-webkit-airplay="allow" allowfullscreen></iframe>';
                            }

                            if (/qq\.com/.test(url)) {
                                var arr = /([a-zA-Z0-9]+)\.html/.exec(url);
                                html = '<iframe src="https://v.qq.com/txp/iframe/player.html?vid=' + arr[1] + '" width="' + width + '" height="' + height + '" frameborder="0" webkit-playsinline playsinline x5-playsinline x-webkit-airplay="allow" allowfullscreen></iframe>';
                            }

                            if (/\.mp4$/.test(url)) {
                                html = K.mediaVideo({
                                    src: url,
                                    type: 'video/mp4',
                                    width: width,
                                    height: height,
                                    autostart: 'true',
                                    loop: 'true',
                                    playsinline: 'true',
                                    'webkit-playsinline': 'true',
                                    'x5-playsinline': true,
                                    controls:true
                                });
                            }
                            self.insertHtml(html).hideDialog().focus();
                        }
                    }
                }),
                div = dialog.div,
                urlBox = K('[name="url"]', div),
                widthBox = K('[name="width"]', div),
                heightBox = K('[name="height"]', div);
        },
        'delete': function () {
        }
    };
    self.clickToolbar(name, self.plugin.video.edit);
});
