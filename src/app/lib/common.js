import moment from 'moment';

const JPWeek = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];

export function getNowTime () {
  return moment();
}

export function getJPDate (date) {
  return moment(date).format('YYYY-MM-DD')
    .concat(JPWeek[moment(date).day()]);
}

export function getJPDateWithHour (date) {
  return moment(date).format('YYYY-MM-DD')
    .concat(JPWeek[moment(date).day()])
    .concat(moment(date).format('HH:mm'));
}