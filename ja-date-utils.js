let dateConfig = {
    dateFormat: 'YYYY-MM-DD hh:mm:ss',// 默认返回的时间格式
    dateAdd: 'YYYY-MM-DD', //时间加减返回的时间格式
};
const initDateConfig = (config)=>{
    if (typeof (config) == 'string'){
        dateConfig.dateFormat = config;
        dateConfig.dateAdd = config;
    } else if (typeof (config) == 'object'){
        dateConfig = Object.assign(dateConfig, config);//合并配置
    }
}
const toDate = (curStr)=> {//将字符串时间 || 时间戳 转化为时间类型。     未传值默认为当前时间
    // curStr 为 "2019/06/04 01:59:59" 形式
    let strTimeStamp = +curStr;
    let timeDate;

    if (curStr === '') {// 如果是空字符串则为当前时间
        timeDate = new Date();
    } else if (isNaN(strTimeStamp)) {//时间类型 如 "2019-08-10"
        timeDate = new Date(curStr.replace(/-/g, "/"));
    } else {//时间戳  如："1559295683340"
        (""+strTimeStamp).length == 10 && (strTimeStamp*=1000);
        timeDate = new Date(strTimeStamp);
    }
    if (timeDate.length === 12) {// 'Invalid Date'.length == 12 无效日期   相对于  timeDate=='Invalid Date' 性能提升一倍
        return null;
    } else {
        return timeDate;
    }
};

const dateFormat = (date, fmt)=> {//字符串转化任意格式时间,    未传值默认为当前时间
    // 例: dateFormat('1559530562175', "YYYY-MM-DD hh:mm:ss.S 周W(w) t.T month月 第Q季度")
    // 返回值:  "2019-06-03 10:56:02.175 am.上午 周一(1) 六月 第2季度"
    fmt = fmt || dateConfig.dateFormat;
    let timeDate = toDate(date);
    if (timeDate == null) return timeDate;

    let week = { "0": '日', "1": '一', "2": '二', "3": '三', "4": '四', "5": '五', "6": '六' };//星期 -- 中文
    let weekNum = { "0": 7, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6 };//星期 -- 数字
    let month = { "1": '一', "2": '二', "3": '三', "4": '四', "5": '五', "6": '六', "7": '七', "8": '八', "9": '九', "10": '十', "11": '十一', "12": '十二' };//月份 -- 中文
    let result = fmt
        .replace(/YYYY/, timeDate.getFullYear()) //年
        .replace(/Y/, timeDate.getFullYear()) //年
        .replace(/MM/, repair0(timeDate.getMonth() + 1)) //月份 -- 数字
        .replace(/M/, timeDate.getMonth() + 1) //月份 -- 不补0
        .replace(/month/, month[timeDate.getMonth() + 1]) //月份 -- 中文
        .replace(/DD/, repair0(timeDate.getDate())) //日
        .replace(/D/, timeDate.getDate()) //日 -- 不补0
        .replace(/hh/, repair0(timeDate.getHours())) //小时
        .replace(/h/, timeDate.getHours()) //小时 -- 不补0
        .replace(/mm/, repair0(timeDate.getMinutes())) //分
        .replace(/m/, timeDate.getMinutes()) //分 -- 不补0
        .replace(/ss/, repair0(timeDate.getSeconds())) //秒
        .replace(/s/, timeDate.getSeconds()) //秒 -- 不补0
        .replace(/S/, timeDate.getMilliseconds()) //毫秒
        .replace(/Q/, Math.floor((timeDate.getMonth() + 3) / 3))  //季度
        .replace(/w/, weekNum[timeDate.getDay()]) //星期 -- 数字
        .replace(/W/, week[timeDate.getDay()]) //星期 -- 中文
        .replace(/t/, timeDate.getHours() < 12 ? 'am' : 'pm') //am: 上午, pm: 下午
        .replace(/T/, timeDate.getHours() < 12 ? '上午' : '下午') //am: 上午, pm: 下午

    function repair0(value) {//小于10 补0
        if (value < 10) return '0' + value;
        else return value;
    }
    return result;
};
const dateAdd = function (date, num, type, fmt) {//数量，要增减的单位，返回格式
    // 例：dateAdd("1559530562175", 2,'DD', 'YYYY-MM-DD')
    // 返回值:  "2019-06-05"
    type = type || 'DD';
    fmt = fmt || dateConfig.dateAdd;
    let timeDate = toDate(date);
    if (timeDate == null) return timeDate;
    num = +num;//如果是字符串，转成数字
    if (type == 'ss') { //秒
        timeDate.setSeconds(timeDate.getSeconds() + num);
    } else if (type == 'mm') { //分
        timeDate.setMinutes(timeDate.getMinutes() + num);
    } else if (type == 'hh') { //小时
        timeDate.setHours(timeDate.getHours() + num);
    } else if (type == 'w') { //周
        timeDate.setDate(timeDate.getDate() + (7 * num));
    } else if (type == 'DD') { //天
        timeDate.setDate(timeDate.getDate() + num);
    } else if (type == 'MM') { //月
        timeDate.setMonth(timeDate.getMonth() + num);
    } else if (type == 'YYYY') { //年
        timeDate.setYear(timeDate.getFullYear() + num);
    }
    return dateFormat(timeDate, fmt);
}
const dateDiff = function (parame) {// 计算时间差
    let result = '', config = {}, timeDate, targetTime;
    if (typeof (parame) == 'string') {
        targetTime = toDate(parame); // 需要对比的时间
        timeDate = new Date(); //　目标时间  默认当前时间
    } else if (typeof (parame) == 'object') {
        config = parame || {};
        targetTime = toDate(config.date || new Date()); // 需要对比的时间
        timeDate = toDate(config.dateTarget || new Date()); //　目标时间  默认当前时间
    }


    let second = 1000;
    let minute = 1000 * 60;   //把分，时，天，周，月，年 用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let month = day * 30;
    let year = month * 12;

    let diffValueOld = timeDate - targetTime;//时间差
    let diffType = diffValueOld > 0 ? "前" : "后";
    let diffValue = Math.abs(diffValueOld);//取绝对值
    let seconC = diffType / second; //计算时间差的秒，分，时，天，周，月，年
    let minC = diffValue / minute;
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    let yearC = diffValue / year;

    function isSameDay(type, timeDate, targetTime) {//是否同一天
        let diff = 0;
        if (type == 'today') {
            diff = 0;
        } else if (type == 'yesterday') {
            diff = 24 * 3600 * 1000;
        }
        let today = new Date(timeDate.getFullYear(), timeDate.getMonth(), timeDate.getDate()).getTime(); //当前时间 00:00:00
        let targetDay = new Date(targetTime.getFullYear(), targetTime.getMonth(), targetTime.getDate()).getTime(); //目标时间 00:00:000
        return Math.abs(targetDay - today) == diff;
    }
    if (isSameDay("today", timeDate, targetTime)) {//今天
        if (minC >= 1 && minC < 60) {
            result = parseInt(minC) + "分钟" + diffType;
        } else if (hourC >= 1 && hourC < 24) {
            result = parseInt(hourC) + "小时" + diffType;
        } else {
            result = "刚刚";
        }
    } else if (isSameDay("yesterday", timeDate, targetTime)) {
        result = diffValueOld > 0 ? "昨天" : "明天";
    } else if (dayC >= 2 && dayC < 7) {
        result = parseInt(dayC) + "天" + diffType;
    } else if (weekC >= 1 && weekC < 30 / 7) {
        result = parseInt(weekC) + "周" + diffType;
    } else if (monthC >= 1 && monthC < 12) {
        result = parseInt(monthC) + "月" + diffType;
    } else if (yearC >= 1) {
        result = parseInt(yearC) + "年" + diffType;
    } else {
        result = dateFormat(targetTime, config.dateFormat);
    }
    if (config.dateMaxValue) {//超过指定时长则直接显示时间
        let condition = [config.dateMaxType == 'YYYY' && yearC > config.dateMaxValue,
            config.dateMaxType == 'MM' && monthC > config.dateMaxValue,
            config.dateMaxType == 'DD' && dayC > config.dateMaxValue,
            config.dateMaxType == 'w' && weekC > config.dateMaxValue,
            config.dateMaxType == 'hh' && hourC > config.dateMaxValue,
            config.dateMaxType == 'mm' && minC > config.dateMaxValue,
            config.dateMaxType == 'ss' && second > config.dateMaxValue,
        ]
        for (let item of condition){
            if (item) {
                result = dateFormat(targetTime, config.dateFormat);
                break;
            };
        }
    }
    return result;
};
const isToDay = (date, dateTarget = new Date())=>{ // 是否今天
    return dateFormat(date, 'YYYY-MM-DD') == dateFormat(dateTarget, 'YYYY-MM-DD');
}
const isInDate = (date, num = 1, type = 'DD', dateTarget = new Date())=>{ // 是否在时间范围内
    let second = 1000;
    let minute = 1000 * 60;   //把分，时，天，周，月，年 用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let month = day * 30;
    let year = month * 12;

    let diffValueOld = toDate(dateTarget) - toDate(date);//时间差
    if(diffValueOld<0){return false};
    let diffValue = Math.abs(diffValueOld);//取绝对值
    let seconC = diffValue / second; //计算时间差的秒，分，时，天，周，月，年
    let minC = diffValue / minute;
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    let yearC = diffValue / year;

    let condition = [type == 'YYYY' && yearC <= num,
        type == 'MM' && monthC <= num,
        type == 'DD' && dayC <= num,
        type == 'w' && weekC <= num,
        type == 'hh' && hourC <= num,
        type == 'mm' && minC <= num,
        type == 'ss' && seconC <= num,
    ]
    let flag = false;
    for (let item of condition){
        if (item) {
            flag = true
            break;
        };
    }
    return flag;
}
module.exports = {
    initDateConfig, // 初始化默认配置
    dateFormat, // 格式化时间
    dateAdd, // 时间增减
    dateDiff, // 计算时间差
    isInDate, // 是否在时间范围内
    isToDay, // 是否今天
}
