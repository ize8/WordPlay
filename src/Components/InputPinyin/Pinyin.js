/* eslint-disable */
const order = "aoeiuv";
const withMarks = [
  ["\u0101", "\u014d", "\u0113", "\u012b", "\u016b", "\u01d6"], //tone 1
  ["\u00e1", "\u00f3", "\u00e9", "\u00ed", "\u00fa", "\u01d8"], //tone 2
  ["\u01ce", "\u01d2", "\u011b", "\u01d0", "\u01d4", "\u01da"], //tone 3
  ["\u00e0", "\u00f2", "\u00e8", "\u00ec", "\u00f9", "\u01dc"], //tone 4
  ["a", "o", "e", "i", "u", "v"] //tone 5/0
];

const validPinyin = /(([mM]iu|[pmPM]ou|[bpmBPM](o|e(i|ng?)?|a(ng?|i|o)?|i(e|ng?|a[no])?|u))|([fF](ou?|[ae](ng?|i)?|u))|([dD](e(i|ng?)|i(a[on]?|u))|[dtDT](a(i|ng?|o)?|e(i|ng)?|i(a[on]?|e|ng|u)?|o(ng?|u)|u(o|i|an?|n)?))|([nN]eng?|[lnLN](a(i|ng?|o)?|e(i|ng)?|i(ang|a[on]?|e|ng?|u)?|o(ng?|u)|u(o|i|an?|n)?|ve?))|([ghkGHK](a(i|ng?|o)?|e(i|ng?)?|o(u|ng)|u(a(i|ng?)?|i|n|o)?))|([zZ]h?ei|[czCZ]h?(e(ng?)?|o(ng?|u)?|ao|u?a(i|ng?)?|u?(o|i|n)?))|([sS]ong|[sS]hua(i|ng?)?|[sS]hei|[sS][h]?(a(i|ng?|o)?|en?g?|ou|u(a?n|o|i)?|i))|([rR]([ae]ng?|i|e|ao|ou|ong|u[oin]|ua?n?))|([jqxJQX](i(a(o|ng?)?|[eu]|ong|ng?)?|u(e|a?n)?))|(([aA](i|o|ng?)?|[oO]u?|[eE](i|ng?|r)?))|([wW](a(i|ng?)?|o|e(i|ng?)?|u))|[yY](a(o|ng?)?|e|in?g?|o(u|ng)?|u(e|a?n)?))[0-5]?/g;
export const splitPinyin = pinyin => pinyin.match(validPinyin);
export const getTone = pinyin =>
  pinyin.match(/[0-5]$/g) ? Number(pinyin.match(/[0-5]$/g)[0]) : 5;
export const getPin = pinyin => pinyin.match(/^[a-z]+/g)?.[0];

export const putMark = pinyin => {
  const tone = getTone(pinyin);
  const pin = getPin(pinyin);
  if (tone === 0 || tone === 5) return pin;

  let marker = -1;
  for (var j = 0; j < order.length; j++) {
    marker = pin.indexOf(order[j]);
    if (marker > -1) break;
  }
  if (pin[marker] === "i" && pin[marker + 1] === "u") marker++;

  const marked = withMarks[tone - 1][withMarks[4].indexOf(pin[marker])];
  return pin.slice(0, marker) + marked + pin.slice(marker + 1);
};

const convTones = list =>
  !list
    ? ""
    : list.length > 1
    ? putMark(list[0]) + " " + convTones(list.splice(1))
    : putMark(list[0]);

export const markMe = pinyin => convTones(splitPinyin(pinyin));
