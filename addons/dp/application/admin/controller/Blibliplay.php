<?php
namespace app\admin\controller;
use think\Db;

class Blibliplay extends Base
{
    public function __construct()
    {
        parent::__construct();
    }

    public function set()
    {
        if (Request()->isPost()) {
            $config = input();
            if($config['gx']['logo']==0){
                $config['gx']['logo_val']= 'left: 5%;top: 5%;';
            }else if($config['gx']['logo']==1){
                $config['gx']['logo_val'] = 'right: 5%;top: 5%;';
            }else if($config['gx']['logo']==2){
                $config['gx']['logo_val'] = 'left: 5%;bottom: 5%;';
            }else if($config['gx']['logo']==3){
                $config['gx']['logo_val'] = 'right: 5%;bottom: 5%;';
            }
            $config['user'] = join(',', $config['user']);
            if(empty($config['user'])){
                $config['user'] = 'NULL';
            }
            $config['try-user'] = join(',', $config['try-user']);
            if(empty($config['try-user'])){
                $config['try-user'] = 'NULL';
            }

            $config['tga'] = str_replace("\r\n","\n",$config['tga']);
            $config['tga'] = str_replace( "\n","#",$config['tga']);
            $config['random_img'] = str_replace("\r\n","\n",$config['random_img']);
            $config['random_img'] = str_replace( "\n","#",$config['random_img']);
            $config['api'] = str_replace("\r\n","#",$config['api']);
            $config['api'] = str_replace("\n","#",$config['api']);

            //json分组
            $configData = [

            ];
            $data = explode("#", $config['api']);
            foreach ($data as $k => $v){
                $apiData = explode("$", $v);
                $apiFrom = explode(",", $apiData[0]);
                foreach ($apiFrom as $k2 => $v2){
                    $configData[$v2][] = $apiData[1];
                }
            }
            $config['jx'] = $configData;

            $config_old = config("blibliplay");
            $config_new = array_merge($config_old, $config);
            $res = mac_arr2file(APP_PATH . "extra/blibliplay.php", $config_new);
            if ($res === false) {
                return $this->error("保存失败，请重试!");
            }
            return $this->success("保存成功!");
        }
        $res = model('Group')->listData('','group_id asc');
        $this->assign("userList", $res['list']);
        $config = config("blibliplay");
        $js = $config['jx'];
        $this->assign("jxList", $js);
        $config['tga'] = str_replace( "#","\n",$config['tga']);
        $config['random_img'] = str_replace( "#","\n",$config['random_img']);
        $config['api'] = str_replace("#","\n",$config['api']);
        $this->assign("config", $config);
        return $this->fetch("admin@system/blibliplay");
    }

    public function list(){
        $param = input();
        $param['page'] = intval($param['page']) <1 ? 1 : $param['page'];
        $param['limit'] = intval($param['limit']) <1 ? $this->_pagesize : $param['limit'];
        $limit_str = ($param['limit'] * ($param['page']-1)) .",".$param['limit'];
        $where = [];

        if(!empty($param['status'])){
            $param['status'] = intval($param['status']);
            if($param['status'] == 2){
                $param['status'] =0;
            }
            $where['comment_status'] = ['eq',$param['status']];
        }
        if(!empty($param['wd'])){
            $param['wd'] = htmlspecialchars(urldecode($param['wd']));
            $where['text|id'] = ['like','%'.$param['wd'].'%'];
        }

        $list = Db::table('danmaku_list')->where($where)->order('time desc')->limit($limit_str)->select();

        $total = Db::table('danmaku_list')->where($where)->count();
        $this->assign('total',$total);
        $this->assign('page',$param['page']);
        $this->assign('limit',$param['limit']);

        $param['page'] = '{page}';
        $param['limit'] = '{limit}';
        $this->assign('param',$param);

        $this->assign('list',$list);
        $this->assign('time',date("Y-m-d",time()));
        return $this->fetch('admin@system/bliblilist');
    }

    public function report(){
        $param = input();
        $param['page'] = intval($param['page']) <1 ? 1 : $param['page'];
        $param['limit'] = intval($param['limit']) <1 ? $this->_pagesize : $param['limit'];
        $limit_str = ($param['limit'] * ($param['page']-1)) .",".$param['limit'];
        $where = [];

        $list = Db::table('danmaku_report')->where($where)->order('time desc')->limit($limit_str)->select();

        $total = Db::table('danmaku_report')->where($where)->count();
        $this->assign('total',$total);
        $this->assign('page',$param['page']);
        $this->assign('limit',$param['limit']);

        $param['page'] = '{page}';
        $param['limit'] = '{limit}';
        $this->assign('param',$param);

        $this->assign('list',$list);
        $this->assign('time',date("Y-m-d",time()));
        return $this->fetch('admin@system/bliblireport');
    }

    public function info()
    {
        if (Request()->isPost()) {
            $data = input('post.');
            if(!empty($data['cid'])){
                Db::table('danmaku_list')->where('cid',$data['cid'])->update($data);
            }
            return $this->success('修改成功');
        }

        $id = input('id');
        $where=[];
        $where['cid'] = $id;
        if(empty($where) || !is_array($where)){
            return $this->error(lang('param_err'));
        }
        $info = Db::table('danmaku_list')->field('*')->where($where)->find();
        $this->assign('info',$info);
        return $this->fetch('admin@system/blibliinfo');
    }

    public function del()
    {
        $param = input();
        $ids = $param['ids'];
        if(!empty($ids) || !empty($all)){
            $where=[];
            $where['cid'] = ['in',$ids];
            if($all==1){
                $where['cid'] = ['gt',0];
            }
            $res = Db::table('danmaku_list')->where($where)->delete();
            if($res===false){
                return $this->success(lang('del_err'));
            }
            return $this->success(lang('del_ok'));
        }
        return $this->error(lang('param_err'));
    }

    public function report_del()
    {
        $param = input();
        $ids = $param['ids'];
        if(!empty($ids) || !empty($all)){
            $where=[];
            $where['cid'] = ['in',$ids];
            if($all==1){
                $where['cid'] = ['gt',0];
            }
            $res = Db::table('danmaku_report')->where($where)->delete();
            if($res===false){
                return $this->success(lang('del_err'));
            }
            return $this->success('已经解除举报');
        }
        return $this->error(lang('param_err'));
    }

    public function report_bc_del(){

        $param = input();
        $text = $param['name'];
        if(!empty($text)){
            $where=[];
            $where['text'] = ['in',$text];
            $res = Db::table('danmaku_list')->where($where)->delete();
            if($res===false){
                return $this->success(lang('del_err'));
            }
            return $this->success('已从弹幕库中删除所有相同弹幕');
        }
        return $this->error(lang('param_err'));

    }

    public function field()
    {
        $param = input();
        $ids = $param['ids'];
        $col = $param['col'];
        $val = $param['val'];

        if(!empty($ids) && in_array($col,['comment_status']) ){
            $where=[];
            $where['cid'] = ['in',$ids];
            if(!isset($col) || !isset($val)){
                return ['code'=>1001,'msg'=>lang('param_err')];
            }
            $data = [];
            $data[$col] = $val;
            $res = Db::table('danmaku_list')->where($where)->update($data);
            return $this->success('操作成功');
        }
        return $this->error(lang('param_err'));
    }

}