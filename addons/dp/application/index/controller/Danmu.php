<?php
/**
 * DPlayer+【弹幕api】 作者QQ:602524950（禁止删除修改版权信息）
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 ) 遵循Apache2开源协议发布，并提供免费使用
 * DPlayer+ 播放器唯一指定下载更新网站:MacCmsBox.Com
 * @version 2.0
 * @author Sweet seven <602524950@qq.com>
 */
namespace app\index\controller;
use think\Db;
use think\Cache;

class Danmu extends Base
{
    /**
     * 弹幕收发接口
     * @return string
     */
    public function index()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $d_data = json_decode(file_get_contents('php://input'), true);
            $player = htmlspecialchars(urldecode($d_data['player']));
            $player = $this->h($player);
            $type = htmlspecialchars(urldecode($d_data['type']));
            $type = $this->h($type);
            $size = htmlspecialchars(urldecode($d_data['size']));
            $size = $this->h($size);
            $text = htmlspecialchars(urldecode($d_data['text']));
            $text = $this->h($text);
            $text = $this->remove_xss($text);
            $color = htmlspecialchars(urldecode($d_data['color']));
            $color = $this->h($color);
            $time = htmlspecialchars(urldecode($d_data['time']));
            $time = $this->h($time);
            $ip = $this->get_client_ip();
            $config = config('blibliplay');
            if($config['chinese'] == 0){
                if (!preg_match("/^[\x{4e00}-\x{9fa5}]+$/u",$text)) {
                    return json(['code' => -1, 'danmuku' => false , 'msg' => '弹幕只可以输入中文']);
                }
            }
            if($config['chinese'] == 1){
                if (!preg_match('/[^\x00-\x80]/',$text)) {
                    return json(['code' => -1, 'danmuku' => false , 'msg' => '弹幕内容中必须包含中文']);
                }
            }
            if(mb_strlen($text,'utf8') > $config['length']){
                return json(['code' => -1, 'danmuku' => false , 'msg' => '内容长度请控制在'.$config['length'].'个字内']);
            }
            if($config['handle'] == 0){
                $text = $this->contraband($text,$config['pbgjz']);
            }
            if($config['handle'] == 1 && !empty($config['pbgjz'])){
                $str_contraband  = $this->contraband_strict($text,$config['pbgjz']);
                if($str_contraband == false){
                    return json(['code' => -1, 'danmuku' => false , 'msg' => '弹幕内容包含违规词请修改后在发布']);
                }
            }
            if (!empty(cookie('bli_comment'))) {
                return json(['code' => -1, 'danmuku' => false , 'msg' => '请勿频繁操作！']);
            }
            $data = ['id' => $player, 'type' => $type, 'size' => $size, 'text' => $text, 'color' => $color, 'videotime' => $time , 'ip' => $ip ,'comment_status'=>$config['audit'] == 1 ? 0 : 1,'time' => time()];
            Db::table('danmaku_list')->insert($data);
            cookie('bli_comment', 't', $config['sendtime']);
            return json(['code' => 23, 'danmuku' => true , 'msg' => '发送成功~']);
        }
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $input = input();
            $ac = htmlspecialchars(urldecode(trim($input['ac'])));
            $id = htmlspecialchars(urldecode(trim($input['id'])));
            $id = $this->h($id);

            if (empty($ac) && empty($id)) {
                return json(['code' => -1, 'msg' => '参数错误']);
            }
            if ($ac == "get") {
                $mes = $this->sql($id);
                $length = count($mes);
            } elseif ($ac == "dm") {
                $mes = $this->sql($id);
                $length = count($mes);
                if ($length == 0) {
                    $mov = "一条弹幕都没有，赶紧来一发吧！";
                } else {
                    $mov = "有 $length 条弹幕列队来袭~做好准备吧！";
                }
                $tips = [2, "right", "#fff", "", "$mov"];
                $tips1 = [6, "top", '#fb7299', "", '请大家遵守弹幕礼仪，文明发送弹幕'];
                array_unshift($mes, $tips, $tips1);
            }
            return json(['code' => 23, 'name' => $id, 'danum' => $length, 'danmuku' => $mes]);
        }
        return 'Api';
    }

    /**
     *  ArtPlayer xml弹幕收发接口
     * @return string
     */
    public function art()
    {
        $input = input() ;
        $id = htmlspecialchars(urldecode(trim($input['id'])));
        $config = config('blibliplay');
        $cachetime = $config['cache'];
        $res = Cache::get($id."xml");
        if(!empty($res)) {
            return $res;
        }
        $where=[];
        $where['id'] = $id;
        $where['comment_status'] = ['eq',1];
        $red = Db::table('danmaku_list')->where($where)->select();
        $arr = '';
        foreach ($red as $k => $v) {
            $arr = $arr.'<d p="'.$v['videotime'].','.$this->type($v['type']).',25,'.$this->RGBToHex($v['color']).','.$v['time'].',11,0,0">'.$v['text'].'</d>';
        }
        $arr = '<?xml version="1.0" encoding="UTF-8"?><i>'.$arr."</i>";
        if(!empty($cachetime)){
            Cache::set($id."xml", $arr, $cachetime);
        }
        return $arr;
    }

    /**
     *  ArtPlayer弹幕类型转换
     * @param string type
     * @return string
     */
    private function type($type){
        if($type == "top"){
            return 5;
        }else if($type == "bottom"){
            return 4;
        }else{
            return 1;
        }
    }
    /**
     *  ArtPlayer 颜色代码统一转为10进制
     * @param string type
     * @return string
     */
    private function RGBToHex($rgb){
        if(substr($rgb,0 ,1) == "#"){
            return hexdec($rgb);
        }
        $regexp = "/^rgb\(([0-9]{0,3})\,\s*([0-9]{0,3})\,\s*([0-9]{0,3})\)/";
        $re = preg_match($regexp, $rgb, $match);
        $re = array_shift($match);
        $hexColor = "#";
        $hex = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
        for ($i = 0; $i < 3; $i++) {
            $r = null;
            $c = $match[$i];
            $hexAr = array();
            while ($c > 16) {
                $r = $c % 16;
                $c = ($c / 16) >> 0;
                array_push($hexAr, $hex[$r]);
            }
            array_push($hexAr, $hex[$c]);
            $ret = array_reverse($hexAr);
            $item = implode('', $ret);
            $item = str_pad($item, 2, '0', STR_PAD_LEFT);
            $hexColor .= $item;
        }
        return hexdec($hexColor);
    }

    /**
     * 查询弹幕池
     * @param string id 弹幕id
     * @access private
     * @throws $red throw an error if the argument is null.
     * @return array
     */
    private function sql($id):array
    {
        $config = config('blibliplay');
        $cachetime = $config['cache'];
        $res = Cache::get($id."dp");
        if(!empty($res)) {
            return $res;
        }
        $where=[];
        $where['id'] = $id;
        $where['comment_status'] = ['eq',1];
        $red = Db::table('danmaku_list')->where($where)->select();
        $arr = [];
        foreach ($red as $k => $v) {
            $arr[$k][] = (float)$v['videotime'];  //弹幕出现时间(s)
            $arr[$k][] = (string)$v['type'];   //弹幕样式
            $arr[$k][] = (string)$v['color']; //字体的颜色
            $arr[$k][] = (string)$v['cid'];  //现在是弹幕id，以后可能是发送者id了
            $arr[$k][] = (string)$v['text'];  //弹幕文本
            $arr[$k][] = (string)$v['ip'];  //弹幕ip
            $arr[$k][] = $date = date('m-d H:i', $v['time']);  //弹幕系统时间
            $arr[$k][] = (string)$v['size'];  //弹幕系统大小
        }
        if(!empty($cachetime)){
            Cache::set($id."dp", $arr, $cachetime);
        }
        return $arr;
    }

    private function h($text){
        $text	=	trim($text);
        //完全过滤注释
        $text	=	preg_replace('/<!--?.*-->/','',$text);
        //完全过滤动态代码
        $text	=	preg_replace('/<\?|\?'.'>/','',$text);
        //完全过滤js
        $text	=	preg_replace('/<script?.*\/script>/','',$text);

        $text	=	str_replace('[','&#091;',$text);
        $text	=	str_replace(']','&#093;',$text);
        $text	=	str_replace('|','&#124;',$text);
        //过滤换行符
        $text	=	preg_replace('/\r?\n/','',$text);
        //br
        $text	=	preg_replace('/<br(\s\/)?'.'>/i','[br]',$text);
        $text	=	preg_replace('/(\[br\]\s*){10,}/i','[br]',$text);
        //过滤危险的属性，如：过滤on事件lang js
        while(preg_match('/(<[^><]+)( lang|on|action|background|codebase|dynsrc|lowsrc)[^><]+/i',$text,$mat)){
            $text=str_replace($mat[0],$mat[1],$text);
        }
        while(preg_match('/(<[^><]+)(window\.|javascript:|js:|about:|file:|document\.|vbs:|cookie)([^><]*)/i',$text,$mat)){
            $text=str_replace($mat[0],$mat[1].$mat[3],$text);
        }
        //转换引号
        while(preg_match('/(\[[^\[\]]*=\s*)(\"|\')([^\2=\[\]]+)\2([^\[\]]*\])/i',$text,$mat)){
            $text=str_replace($mat[0],$mat[1].'|'.$mat[3].'|'.$mat[4],$text);
        }
        //转换其它所有不合法的 < >
        $text	=	str_replace('<','&lt;',$text);
        $text	=	str_replace('>','&gt;',$text);
        $text	=	str_replace('"','&quot;',$text);
        //反转换
        $text	=	str_replace('[','<',$text);
        $text	=	str_replace(']','>',$text);
        $text	=	str_replace('|','"',$text);
        //过滤多余空格
        $text	=	str_replace('  ',' ',$text);
        return $text;
    }

    private function remove_xss($val) {
        $val = preg_replace('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/', '', $val);
        $search = 'abcdefghijklmnopqrstuvwxyz';
        $search .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $search .= '1234567890!@#$%^&*()';
        $search .= '~`";:?+/={}[]-_|\'\\';
        for ($i = 0; $i < strlen($search); $i++) {
            $val = preg_replace('/(&#[xX]0{0,8}'.dechex(ord($search[$i])).';?)/i', $search[$i], $val); // with a ;
            $val = preg_replace('/(&#0{0,8}'.ord($search[$i]).';?)/', $search[$i], $val); // with a ;
        }
        $ra1 = array('javascript', 'vbscript', 'expression', 'applet', 'meta', 'xml', 'blink', 'link', 'style', 'script', 'embed', 'object', 'iframe', 'frame', 'frameset', 'ilayer', 'layer', 'bgsound', 'title', 'base');
        $ra2 = array('onabort', 'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable', 'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onerrorupdate', 'onfilterchange', 'onfinish', 'onfocus', 'onfocusin', 'onfocusout', 'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange', 'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onrowenter', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll', 'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop', 'onsubmit', 'onunload');
        $ra = array_merge($ra1, $ra2);
        $found = true; // keep replacing as long as the previous round replaced something
        while ($found == true) {
            $val_before = $val;
            for ($i = 0; $i < sizeof($ra); $i++) {
                $pattern = '/';
                for ($j = 0; $j < strlen($ra[$i]); $j++) {
                    if ($j > 0) {
                        $pattern .= '(';
                        $pattern .= '(&#[xX]0{0,8}([9ab]);)';
                        $pattern .= '|';
                        $pattern .= '|(&#0{0,8}([9|10|13]);)';
                        $pattern .= ')*';
                    }
                    $pattern .= $ra[$i][$j];
                }
                $pattern .= '/i';
                $replacement = substr($ra[$i], 0, 2).'<x>'.substr($ra[$i], 2); // add in <> to nerf the tag
                $val = preg_replace($pattern, $replacement, $val); // filter out the hex tags
                if ($val_before == $val) {
                    // no replacements were made, so exit the loop
                    $found = false;
                }
            }
        }
        return $val;
    }

    private function get_client_ip(){
        if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown"))
            $ip = getenv("HTTP_CLIENT_IP");
        else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown"))
            $ip = getenv("HTTP_X_FORWARDED_FOR");
        else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown"))
            $ip = getenv("REMOTE_ADDR");
        else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown"))
            $ip = $_SERVER['REMOTE_ADDR'];
        else
            $ip = "unknown";
        return htmlspecialchars($ip, ENT_QUOTES);
    }

    private function contraband_strict($str,$words)
    {
        $str_contraband = true;
        $arr = explode(",",$words);
        foreach($arr as $a){
            if(strpos($str,$a) !== false){
                $str_contraband = false;
                break;
            }
        }
        return $str_contraband;
    }

    private function contraband($str,$words)
    {
        $arr = explode(",",$words);
        foreach($arr as $a){
            $str= str_replace($a,"***",$str);
        }
        return $str;
    }
}