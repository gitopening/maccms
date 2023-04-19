<?php
/**
 * DPlayer+【影视信息api】 作者QQ:602524950（禁止删除修改版权信息）
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 ) 遵循Apache2开源协议发布，并提供免费使用
 * DPlayer+ 播放器唯一指定下载更新网站:MacCmsBox.Com
 * @version 2.0
 * @author Sweet seven <602524950@qq.com>
 */
namespace app\index\controller;
use app\admin\common\Jm;
class Dp extends Base
{
    /**
     * 交互接口
     * @return string|array
     */
    public function index()
    {
        header("Access-Control-Allow-Origin: *");
        $param = mac_param_url();
        $data = $this->json($param);
        $info = $data['info'];
        $vod_remarks = empty($info['vod_blurb']) ? $info['vod_content']:$info['vod_blurb'];
        $relevant = $this->relevant($info['relevant'],$param['ids']);
        $play_list = $this->play_list($info['vod_play_list'],$info['vod_id'],$info['anthology'],$param['wd'],$param['ids']);
        $html = '<div class="normal-title-wrap"><div class="thesis-wrap"><a class="title-link">'.$info['vod_name'].'</a></div><div class="title-info">'.$vod_remarks.'</div></div><div class="scroll-area"><a class="component-title">选集:<span style="font-size:12px">('.$info['vod_remarks'].')</span></a><div class="ec-from-select"><a id="ec-tab-select" href="javascript:">片源切换</a><div class="ec-list">'.$play_list[1].'</div></div>'.$play_list[0].'<a class="component-title">相关影视</a><div class="anthology-content">'.$relevant.'</div></div>';
        return json(['code'=>'200','html'=>$html,'title'=>$info['vod_name']." / ".$info['anthology']['current']]);
    }

    /**
     * 跨域回调接口
     * @return string
     */
    public function api()
    {
        $input = input();
        $id = htmlspecialchars(urldecode(trim($input['id'])));
        $html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title></title></head><body><script>window.onload = function () {parent.parent.api_jump("';
        if(!empty($id)){
            return $html.$id.'")}</script></body></html>';
        }
        $data = explode("|", htmlspecialchars(urldecode(trim($input['jump']))));
        $url = $this->play_url2(["vod_id"=>$data[0]],$data[1],$data[2]);
        return $html.$url.'")}</script></body></html>';
    }

    /**
     * 生成选集列表html
     * @param array data 选集对象
     * @param string id  视频id
     * @param string from 播放组
     * @param string ids  当前网站url
     * @param array anthology 当前集数及播放组
     * @return array
     */
    private function play_list($data,$id,$anthology,$from,$ids):array
    {
        $html = '';
        $from_list = '';
        foreach ($data as $k => $v){
            $a_j = '';
            foreach ($v['urls'] as $k2 => $v2){
                $url = $this->play_url($from,$id,$v2['url'],$v['sid'].'|'.$v2['nid'],$ids);
                if($anthology['current'] == $v2['nid']){
                    $a_j = $a_j.'<a href="'.$url.'" class="box-item album-title ec-this">'.$v2['name'].'</a>';
                }else{
                    $a_j = $a_j.'<a href="'.$url.'" class="box-item album-title">'.$v2['name'].'</a>';
                }
            }
            if($anthology['from'] == $v['sid']){
                $html = $html.'<div class="ec-show ec-selset-list anthology-content">'.$a_j.'</div>';
                $from_list = $from_list.'<a class="ec-this" href="javascript:">'.$v['player_info']['show'].'</a>';
            }else{
                $html = $html.'<div class="ec-selset-list anthology-content">'.$a_j.'</div>';
                $from_list = $from_list.'<a href="javascript:">'.$v['player_info']['show'].'</a>';
            }
        }
        return [$html,$from_list];
    }

    /**
     * 生成相关视频html
     * @param array data 相关视频对象
     * @param string ids
     * @return string
     */
    private function relevant($data,$ids):string
    {
        $html = '';
        if($ids == '/'){$ids = '';}
        foreach ($data as $k => $v){
            $url = $this->play_url2(['vod_id'=>$v['id']],1,1);
            $html = $html.'<div class="pic-text-item"><a href="'.$ids.$url.'"><div class="cover"><img class="bj" src="'.$this->url_img($v['pic']).'" /></div><div class="anthology-title-wrap"><div class="title">'.$v['name'].'</div><div class="subtitle">'.$v['remarks'].'</div></div></a></div>';
        }
        return $html;
    }

    /**
     * 生成播放地址
     * @param string from
     * @param string id
     * @param string url
     * @param string sid
     * @param string api_url
     * @return string
     */
    private function play_url($from,$id,$url,$sid,$api_url):string
    {
        if(Jm::$off == 1){
            $url = Jm::Encrypt($url);
        }else{
            $config = config('blibliplay');
            $url = $this->en($url,$config['key'],$config['iv']);
            $url = "dp_".base64_encode($url);
        }
        return '/addons/dp/player/index.php?key=0&from='.$from.'&id='.$id.'&api='.$api_url.'&url='.$url.'&jump='.$id."|".$sid;
    }
    private function en($data,$encryptKey,$localIV):string
    {
        if (PHP_VERSION >= 7.1) {
            return base64_encode(openssl_encrypt($data, 'aes-128-cbc', $encryptKey, OPENSSL_RAW_DATA, $localIV));
        } else {
            $module = mcrypt_module_open(MCRYPT_RIJNDAEL_128, '', MCRYPT_MODE_CBC, $localIV);
            mcrypt_generic_init($module, $encryptKey, $localIV);
            $block = mcrypt_get_block_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
            $pad = $block - (strlen($data) % $block);
            $data .= str_repeat(chr($pad), $pad);
            $encrypted = mcrypt_generic($module, $data);
            mcrypt_generic_deinit($module);
            mcrypt_module_close($module);
            return base64_encode($encrypted);
        }
    }
    private function play_url2($data,$sid,$nid):string
    {
        return mac_url_vod_play($data,['sid'=>$sid,'nid'=>$nid]);
    }

    /**
     * 调用数据
     * @param array param
     * @return array
     */
    public function json($param):array
    {
        if(Jm::$off == 1){
            $param['url'] = Jm::Decrypt($param['url']);
        }
        if(empty($param['id']) && !empty($param['url'])){
            $vod_detail =  $this->sql_url($param['url']);
            $data = $vod_detail['info'];
        }else{
            $where['vod_id'] = ['eq',$param['id']];
            $where['vod_status'] = ['eq',1];
            $vod_detail = model('Vod')->infoData($where,'*',1);
            $data = $vod_detail['info'];
        }
        if(!empty($data)){
            if(!empty($data['vod_rel_vod'])){
                $r = model("Vod")->listCacheData(['key'=>'key','id'=>'vo','num'=>20,'rel'=>$data['vod_rel_vod']]);
                $vod_list = $this->for($r['list']);
            }else{
                $r = model("Vod")->listCacheData(['key'=>'key','id'=>'vo','num'=>20,'class'=>$data['vod_class']]);
                $vod_list = $this->for($r['list']);
            }
            $vod_detail['info']['relevant'] = $vod_list;
            $anthology = $this->url($param['url'],$data['vod_play_list']);
            $vod_detail['info']['anthology'] = $anthology;
        }
        return $vod_detail;
    }

    /**
     * 获取当前播放组,上一集下一集等参数
     * @param string url
     * @param array  data
     * @return array
     */
    private function url($url,$data):array
    {
        $url = urldecode($url);
        $array = [];
        foreach ($data as $k => $v){
            if(strpos($v['url'],$url) !== false){
                foreach ($v['urls'] as $k2 => $v2){
                    if($v2['url'] == $url){
                        $array['pre'] = $k2>1 ? $v['urls'][$k2-1] : '';
                        $array['next'] = $k2<$v['url_count'] ? $v['urls'][$k2+1]: '';
                        $array['current'] = $k2;
                        $array['from'] = $v['sid'];
                        break;
                    }
                }
                break;
            }
        }
        return $array;
    }

    /**
     * 筛选数据
     * @param array data
     * @return array
     */
    private function for($data):array
    {
        $r_data = [];
        foreach ($data as $k => $v){
            $vod_play_from = explode("$$$",$v['vod_play_from']);
            $vod_play_url = explode("$$$", $v['vod_play_url']);
            $vod_play_url = explode("#", $vod_play_url[0]);
            $vod_play_url = explode("$", $vod_play_url[0]);
            if(empty($vod_play_url[1])){
                $vod_play_url[1] = $vod_play_url[0];
            }
            $r_data[] = [
                'name'=> $v['vod_name'],
                'id'=> $v['vod_id'],
                'pic'=> $v['vod_pic'],
                'from'=> $vod_play_from[0],
                'url'=> $vod_play_url[1],
                'remarks'=> empty($v['vod_remarks']) ? $v['type']['type_name']:$v['vod_remarks'],
            ];
        }
        return $r_data;
    }

    /**
     * 根据资源地址获取影片信息
     */
    private function sql_url($url)
    {
        $where['vod_play_url'] = array('like','%'."$url".'%');
        $data = model('Vod')->where($where)->select();
        $list = $data[0];
        if(!empty($list)){
            $list['vod_play_list'] = $this->ec_play_list($list['vod_play_from'], $list['vod_play_url'], $list['vod_play_server'], $list['vod_play_note'], 'play');
        }
        return ["info"=>$list];
    }

    private function url_img($url)
    {
        if(substr($url,0,4) == 'mac:'){
            $protocol = $GLOBALS['config']['upload']['protocol'];
            if(empty($protocol)){
                $protocol = 'http';
            }
            $url = str_replace('mac:', $protocol.':',$url);
        }
        elseif(substr($url,0,4) != 'http' && substr($url,0,2) != '//' && substr($url,0,1) != '/'){
            if($GLOBALS['config']['upload']['mode']=='remote'){
                $url = $GLOBALS['config']['upload']['remoteurl'] . $url;
            }
            else{
                $url = MAC_PATH . $url;
            }
        }
        elseif(!empty($GLOBALS['config']['upload']['img_key']) && preg_match('/'.$GLOBALS['config']['upload']['img_key'].'/',$url)){
            $url = $GLOBALS['config']['upload']['img_api'] . '' . $url;
        }
        return $url;
    }

    /**
     * 剩下选集列表
     */
    private function ec_play_list($vod_play_from,$vod_play_url,$vod_play_server,$vod_play_note,$flag='play')
    {
        $vod_play_from_list = [];
        $vod_play_url_list = [];
        $vod_play_server_list = [];
        $vod_play_note_list = [];

        if(!empty($vod_play_from)) {
            $vod_play_from_list = explode('$$$', $vod_play_from);
        }
        if(!empty($vod_play_url)) {
            $vod_play_url_list = explode('$$$', $vod_play_url);
        }
        if(!empty($vod_play_server)) {
            $vod_play_server_list = explode('$$$', $vod_play_server);
        }
        if(!empty($vod_play_note)) {
            $vod_play_note_list = explode('$$$', $vod_play_note);
        }

        if($flag=='play'){
            $player_list = config('vodplayer');
        }
        else{
            $player_list = config('voddowner');
        }
        $server_list = config('vodserver');

        $res_list = [];
        $sort=[];
        foreach($vod_play_from_list as $k=>$v){
            $server = (string)$vod_play_server_list[$k];
            $urls = mac_play_list_one($vod_play_url_list[$k],$v);

            $player_info = $player_list[$v];
            $server_info = $server_list[$server];
            if($player_info['status'] == '1') {
                $sort[] = $player_info['sort'];
                $res_list[$k + 1] = [
                    'sid' => $k + 1,
                    'player_info' => $player_info,
                    'server_info' => $server_info,
                    'from' => $v,
                    'url' => $vod_play_url_list[$k],
                    'server' => $server,
                    'note' => $vod_play_note_list[$k],
                    'url_count' => count($urls),
                    'urls' => $urls,
                ];
            }
        }
        if( (ENTRANCE!='admin' && MAC_PLAYER_SORT=='1') ||  $GLOBALS['ismake']=='1' ){
            array_multisort($sort, SORT_DESC, SORT_FLAG_CASE , $res_list);
            $tmp=[];
            foreach($res_list as $k=>$v){
                $tmp[$v['sid']] = $v;
            }
            $res_list = $tmp;
        }
        return $res_list;
    }

}