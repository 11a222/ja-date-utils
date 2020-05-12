## 功能介绍
#### 1：dateFormat // 时间格式化
#### 2：dateAdd // 时间增减
#### 3：dateDiff // 计算时间差
#### 4：isInDate // 是否在时间范围内
#### 5：isToday // 是否今天
## 安装
~~~
npm install ja-date-utils --save
~~~
## 引入
~~~
import dateUtils from 'ja-date-utils';
~~~
## 测试
~~~
dateUtils.dateFormat('1559530562175')
// 结果：2019-06-03 10:56:02
~~~
## 配置
~~~
// 不修改，则默认为以下配置
dateUtils.initDateConfig({ // 修改默认时间格式
    dateFormat: 'YYYY-MM-DD hh:mm:ss',// 默认返回的时间格式
    dateAdd: 'YYYY-MM-DD', //时间加减返回的时间格式
}); 
或
dateUtils.initDateConfig('YYYY-MM-DD hh:mm:ss'); // 对所有日期格式都生效
~~~

##版本更新
>1.2.2 修改isToDay方法为isToday  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;补充dateDiff方法文档遗漏  
>1.2.0 新增 isToday 方法（是否今天）  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新增 isInDate 方法（是否在时间范围内）  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新增支持10位时间戳  
>1.1.5 解决无法部分配置不生效  
>1.1.2 解决中文乱码

## 功能
1、  格式化时间： dateFormat (date, fmt)
>功能描述：传入时间，返回指定格式  

| 参数   | 类型   | 默认 | 必传 | 描述        |
| -------| ------ | ------- | ------- | ---------|
| date   | number / string / date | new Date()| false | 需格式化的时间|
| fmt    | string                 | YYYY-MM-DD hh:mm:ss | false | 需的时间格式([类型](#时间类型))|



#####例子
~~~
dateUtils.dateFormat('1559530562175')
// 结果：2019-06-03 10:56:02
dateUtils.dateFormat('1559530562175', "YYYY-MM-DD hh:mm:ss.S 周W(w) t.T month月 第Q季度")
// 结果：2019-06-03 10:56:02.175 周一(1) am.上午 六月 第2季度
~~~
也可以这样
~~~
dateUtils.dateFormat('2019-06-03 10:56:02', "YYYY年MM月DD日 hh:mm:ss")
// 结果：2019年06月03日 10:56:02
~~~

2、  时间增减： dateAdd (date, num, type, fmt)
>功能描述：传入时间，对时间进行增减操作

| 参数   | 类型   | 默认 | 必传        | 描述        |
| -------| ------ | ------- | ---------| ---------|
| date   | number / string / date | new Date()|   false    | 需要增减的时间|
| num    | number |       |     true   |增减的数量，正数为增，负数为减|  
| type    | string |       |    true   | 增减的[类型](#时间类型)|  
| fmt    | string | YYYY-MM-DD hh:mm:ss |   false    | 返回的时间格式([类型](#时间类型))|  
>type支持的类型有'YYYY'、'MM'、'DD'、'w'、'hh'、'mm'、'ss'  
  
  
#####例子
~~~
dateUtils.dateAdd("2019-06-03", 2, 'YYYY', 'YYYY-MM-DD')
// 功能：在2019-06-03的基础上增加2年
// 结果：2021-06-03

dateUtils.dateAdd("2019-06-03", 3, 'DD', 'YYYY-MM-DD')
// 功能：在2019-06-03的基础上增加3天
// 结果：2019-06-06

dateUtils.dateAdd("2019-06-03", -3, 'DD', 'YYYY-MM-DD')
// 功能：在2019-06-03的基础上减少3天
// 结果：2019-05-31
~~~
3、 计算时间差：dateDiff  (parame)
>功能描述：传入时间，计算与当前时间的差值

#####parame参数说明 -- json类型
| 参数       | 类型   | 默认 |  必传      |  描述        |
| -----------| ------ | ------ | ----| ---------|
| date       | number / string / date |     |  true   | 需要对比的时间|
| dateTarget | number / string / date | new Date()|    |  目标时间(以此为对比标准)|  
| dateMaxValue| number |       |     | 相差超过该数量单位的后显示原时间)|  
| dateMaxType| string |       |     | 相差超过该数量单位的后显示原时间([类型](#时间类型))|  
| dateFormat    | string | YYYY-MM-DD hh:mm:ss |     | 返回的时间格式([类型](#时间类型))|   



#####parame参数说明 -- string类型
| 参数       | 类型   | 默认 |  必传      |  描述        |
| -----------| ------ | ------ | ----| ---------|
| parame     | number / string / date |     |  true   | 需要对比的时间 - 相当于parame.date|   



#####例子
~~~
dateUtils.dateDiff("2019-04-07 12:12:12")
// 功能：对比 2019-04-07 12:12:12 和 当前系统时间 之间的时间差
// 结果：刚刚
相当于
dateDiff({
    date: "2019-04-07 12:12:12"
})


dateUtils.dateDiff({
    date: "2019-04-07 12:12:12",
    dateTarget: "2019-04-07 12:12:55",
})
// 功能：对比 2019-04-07 12:12:12 和 2019-04-07 12:12:55 之间的时间差
// 结果：刚刚

dateUtils.dateDiff({
    date: "2019-04-07",
    dateTarget: "2019-05-13",
})
// 功能：对比 2019-04-07 和 2019-05-13 之间的时间差
// 结果：1月后

dateUtils.dateDiff({
    date: "2019-04-07",
    dateTarget: "2019-05-13",
    dateMaxType: 'MM',
    dateMaxValue: 1,
    dateFormat: 'YYYY-MM-DD',
})
// 功能：对比 2019-04-07 和 2019-05-13 之间的时间差，超过一个月则直接显示date
// 结果：2019-04-07

~~~
4、  是否今天： isToday (date, dateTarget)
>功能描述：传入时间，返回布尔值

| 参数   | 类型   | 默认 | 必传        | 描述        |
| -------| ------ | ------- | ---------| ---------|
| date   | number / string / date |    |   true    | 需要对比的时间|
| dateTarget   | number / string / date| new Date()|   false    | 需要对比目标的时间|  

#####例子
~~~
注：对比的时间的当前系统时间：2020-04-28 11:11:11
dateUtils.isToday('2020-4-28')
// 结果：true

dateUtils.isToday('2020-4-27')
// 结果：false

dateUtils.isToday('2020-4-28', '2020-4-28')
// 结果：true
~~~

5、  是否在时间范围内： isInDate (date, num, type, dateTarget)
>功能描述：对比时间是否在对应单位的范围内，如 1天内、1周内、1个月内

| 参数   | 类型   | 默认 | 必传        | 描述        |
| -------| ------ | ------- | ---------| ---------|
| date   | number / string / date |    |   true    | 需要对比的时间|
| num    | number |    1   |     false   | 对比的数量 |  
| type    | string |    DD   |    false   | 对比的[类型](#时间类型)|  
| dateTarget   | number / string / date| new Date()|   false    | 需要对比目标的时间|  
>type支持的类型有'YYYY'、'MM'、'DD'、'w'、'hh'、'mm'、'ss'  
 
  
#####例子
~~~
注：对比的时间的当前系统时间：2020-04-28 11:11:11
dateUtils.isInDate('2020-04-27 06:37:46', 2, 'DD')
// 结果：true

dateUtils.isInDate('2020-04-25 06:37:46', 2, 'DD')
// 结果：false

dateUtils.isInDate('2020-04-25 06:37:46', 1, 'w')
// 结果：true

dateUtils.isInDate('2020-04-21 06:37:46', 1, 'w')
    // 结果：false
~~~

## 时间类型
以此时间为例：2019-04-07 05:08:09.630

| 时间类型       |  描述        |  例|
| -----------| ------ | ------ |
| YYYY       | 年           |   2019  |
| MM         | 月份         |   04
| M          | 月份 -- 10以下不补0|  4 |
| month      | 月份 -- 中文 |  四 |
| DD         | 日           |   07 |
| D          | 日 -- 10以下不补0|  7 |
| hh         | 小时         |   05 |
| h          | 小时 -- 10以下不补0|   5 |
| mm         | 分           |   08 |
| m          | 分 -- 10以下不补0|   8 |
| ss         | 秒           |   09 |
| s          | 秒 -- 10以下不补0|   9 |
| S          | 毫秒           |   630 |
| Q          | 季度           |   2 |
| w          | 星期 -- 数字   |   7 |
| W          | 星期 -- 中文   |   日 |
| t          | 时段 &nbsp;&nbsp;(am，pm)|   am |
| T          | 时段 &nbsp;&nbsp;(上午，下午)|   上午 |

