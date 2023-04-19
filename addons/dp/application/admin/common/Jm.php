<?php
namespace app\admin\common;
class Jm {

    //是否设置了自定义加密，0没有  1设置了
    public static  $off = 0;

    /**
     * 加密资源地址的方法
     */
    public static function Encrypt($url):string
    {

        return $url;
    }

    /**
     * 解密资源地址的方法
     */
    public static function Decrypt($url):string
    {
        return $url;
    }
}
