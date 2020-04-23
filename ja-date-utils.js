let dateConfig = {
  dateFormat: 'YYYY-MM-DD hh:mm:ss',// Ĭ�Ϸ��ص�ʱ���ʽ
  dateAdd: 'YYYY-MM-DD', //ʱ��Ӽ����ص�ʱ���ʽ
};
const initDateConfig = (config)=>{
  if (typeof (config) == 'string'){
    dateConfig.dateFormat = config;
    dateConfig.dateAdd = config;
  } else if (typeof (config) == 'object'){
    dateConfig = {//�ϲ�����
      dateConfig, 
      ...config
    };
  }
}
const toDate = (curStr)=> {//���ַ���ʱ�� || ʱ��� ת��Ϊʱ�����͡�     δ��ֵĬ��Ϊ��ǰʱ��
  // curStr Ϊ "2019/06/04 01:59:59" ��ʽ
  var strTimeStamp = +curStr;
  var timeDate;

  if (curStr === '') {// ����ǿ��ַ�����Ϊ��ǰʱ��
    timeDate = new Date();
  } else if (isNaN(strTimeStamp)) {//ʱ������ �� "2019-08-10"
    timeDate = new Date(curStr.replace(/-/g, "/"));
  } else {//ʱ���  �磺"1559295683340"
    timeDate = new Date(strTimeStamp);
  }
  if (timeDate.length === 12) {// 'Invalid Date'.length == 12 ��Ч����   �����  timeDate=='Invalid Date' ��������һ��
    return null;
  } else {
    return timeDate;
  }
};

const dateFormat = (date, fmt)=> {//�ַ���ת�������ʽʱ��,    δ��ֵĬ��Ϊ��ǰʱ��
  // ��: dateFormat('1559530562175', "YYYY-MM-DD hh:mm:ss.S ��W(w) t.T month�� ��Q����") 
  // ����ֵ:  "2019-06-03 10:56:02.175 am.���� ��һ(1) ���� ��2����"
  fmt = fmt || dateConfig.dateFormat;
  var timeDate = toDate(date);
  if (timeDate == null) return timeDate;

  var week = { "0": '��', "1": 'һ', "2": '��', "3": '��', "4": '��', "5": '��', "6": '��' };//���� -- ����
  var weekNum = { "0": 7, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6 };//���� -- ����
  var month = { "1": 'һ', "2": '��', "3": '��', "4": '��', "5": '��', "6": '��', "7": '��', "8": '��', "9": '��', "10": 'ʮ', "11": 'ʮһ', "12": 'ʮ��' };//�·� -- ����
  var result = fmt
    .replace(/YYYY/, timeDate.getFullYear()) //��
    .replace(/Y/, timeDate.getFullYear()) //��
    .replace(/MM/, repair0(timeDate.getMonth() + 1)) //�·� -- ����
    .replace(/M/, timeDate.getMonth() + 1) //�·� -- ����0
    .replace(/month/, month[timeDate.getMonth() + 1]) //�·� -- ����
    .replace(/DD/, repair0(timeDate.getDate())) //��
    .replace(/D/, timeDate.getDate()) //�� -- ����0
    .replace(/hh/, repair0(timeDate.getHours())) //Сʱ
    .replace(/h/, timeDate.getHours()) //Сʱ -- ����0
    .replace(/mm/, repair0(timeDate.getMinutes())) //��
    .replace(/m/, timeDate.getMinutes()) //�� -- ����0
    .replace(/ss/, repair0(timeDate.getSeconds())) //��
    .replace(/s/, timeDate.getSeconds()) //�� -- ����0
    .replace(/S/, timeDate.getMilliseconds()) //����
    .replace(/Q/, Math.floor((timeDate.getMonth() + 3) / 3))  //����
    .replace(/w/, weekNum[timeDate.getDay()]) //���� -- ����
    .replace(/W/, week[timeDate.getDay()]) //���� -- ����
    .replace(/t/, timeDate.getHours() < 12 ? 'am' : 'pm') //am: ����, pm: ����
    .replace(/T/, timeDate.getHours() < 12 ? '����' : '����') //am: ����, pm: ����

  function repair0(value) {//С��10 ��0
    if (value < 10) return '0' + value;
    else return value;
  }
  return result;
};
const dateAdd = function (date, num, type, fmt) {//������Ҫ�����ĵ�λ�����ظ�ʽ
  // ����dateAdd("1559530562175", 2,'DD', 'YYYY-MM-DD')
  // ����ֵ:  "2019-06-05"
  type = type || 'DD';
  fmt = fmt || dateConfig.dateAdd;
  var timeDate = toDate(date);
  if (timeDate == null) return timeDate;
  num = +num;//������ַ�����ת������
  if (type == 'ss') { //��
    timeDate.setSeconds(timeDate.getSeconds() + num);
  } else if (type == 'mm') { //��
    timeDate.setMinutes(timeDate.getMinutes() + num);
  } else if (type == 'hh') { //Сʱ
    timeDate.setHours(timeDate.getHours() + num);
  } else if (type == 'w') { //��
    timeDate.setDate(timeDate.getDate() + (7 * num));
  } else if (type == 'DD') { //��
    timeDate.setDate(timeDate.getDate() + num);
  } else if (type == 'MM') { //��
    timeDate.setMonth(timeDate.getMonth() + num);
  } else if (type == 'YYYY') { //��
    timeDate.setYear(timeDate.getFullYear() + num);
  }
  return dateFormat(timeDate, fmt);
}
const dateDiff = function (parame) {// ����ʱ���
  var result = '', config = {}, timeDate, targetTime;
  if (typeof (parame) == 'string') {
    targetTime = toDate(parame); // ��Ҫ�Աȵ�ʱ��
    timeDate = new Date(); //��Ŀ��ʱ��  Ĭ�ϵ�ǰʱ��
  } else if (typeof (parame) == 'object') {
    config = parame || {};
    targetTime = toDate(config.date || new Date()); // ��Ҫ�Աȵ�ʱ��
    timeDate = toDate(config.dateTarget || new Date()); //��Ŀ��ʱ��  Ĭ�ϵ�ǰʱ��
  }
  

  var second = 1000;
  var minute = 1000 * 60;   //�ѷ֣�ʱ���죬�ܣ��£��� �ú����ʾ
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = day * 30;
  var year = month * 12;

  var diffValueOld = timeDate - targetTime;//ʱ���
  var diffType = diffValueOld > 0 ? "ǰ" : "��";
  var diffValue = Math.abs(diffValueOld);//ȡ����ֵ
  var seconC = diffType / second; //����ʱ�����룬�֣�ʱ���죬�ܣ��£���
  var minC = diffValue / minute;
  var hourC = diffValue / hour;
  var dayC = diffValue / day;
  var weekC = diffValue / week;
  var monthC = diffValue / month;
  var yearC = diffValue / year;

  function isSameDay(type, timeDate, targetTime) {//�Ƿ�ͬһ��
    var diff = 0;
    if (type == 'today') {
      diff = 0;
    } else if (type == 'yesterday') {
      diff = 24 * 3600 * 1000;
    }
    var today = new Date(timeDate.getFullYear(), timeDate.getMonth(), timeDate.getDate()).getTime(); //��ǰʱ�� 00:00:00
    var targetDay = new Date(targetTime.getFullYear(), targetTime.getMonth(), targetTime.getDate()).getTime(); //Ŀ��ʱ�� 00:00:000
    return Math.abs(targetDay - today) == diff;
  }
  if (isSameDay("today", timeDate, targetTime)) {//����
    if (minC >= 1 && minC < 60) {
      result = parseInt(minC) + "����" + diffType;
    } else if (hourC >= 1 && hourC < 24) {
      result = parseInt(hourC) + "Сʱ" + diffType;
    } else {
      result = "�ո�";
    }
  } else if (isSameDay("yesterday", timeDate, targetTime)) {
    result = diffValueOld > 0 ? "����" : "����";
  } else if (dayC >= 2 && dayC < 7) {
    result = parseInt(dayC) + "��" + diffType;
  } else if (weekC >= 1 && weekC < 30 / 7) {
    result = parseInt(weekC) + "��" + diffType;
  } else if (monthC >= 1 && monthC < 12) {
    result = parseInt(monthC) + "��" + diffType;
  } else if (yearC >= 1) {
    result = parseInt(yearC) + "��" + diffType;
  } else {
    result = dateFormat(targetTime, config.dateFormat);
  }
  if (config.dateMaxValue) {//����ָ��ʱ����ֱ����ʾʱ��
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

module.exports = {
  initDateConfig, // ��ʼ��Ĭ������
  dateFormat, // ��ʽ��ʱ��
  dateAdd, // ʱ������
  dateDiff, // ����ʱ���
}