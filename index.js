/**
 * @param {String} date
 * @returns {Object}
 */
const regexp = /(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/;

var keys = ['years', 'months', 'days', 'hours', 'minutes'];

function zeroPrefix(value) {
    return (value < 10) ? '0' + value : value;
}

Date.prototype.toString = function() {
    var result = '';
    result += zeroPrefix(this.getFullYear());
    result += '-';
    result += zeroPrefix(this.getMonth() + 1);
    result += '-';
    result += zeroPrefix(this.getDate());
    result += ' ';
    result += zeroPrefix(this.getHours());
    result += ':';
    result += zeroPrefix(this.getMinutes());
    return result;
}

function check(value, key) {
    if (isNaN(value) || value < 0) {
        throw new TypeError('Type missmatch of ' + value);
    }
    if (keys.indexOf(key) === -1) {
        throw new TypeError('Unknown date/time value ' + key);
    }
}

function chahgeDate(date, value, key) {
    switch (key) {
        case 'years':
            value = date.getFullYear() + value;
            date.setFullYear(value);
            break;
        case 'months':
            value = date.getMonth() + value;
            date.setMonth(value);
            break;
        case 'days':
            value = date.getDate() + value;
            date.setDate(value);
            break;

        case 'hours':
            value = date.getHours() + value;
            date.setHours(value);
            break;
        case 'minutes':
            value = date.getMinutes() + value;
            date.setMinutes(value);
            break;

        default:
            throw new TypeError('Smth wrong');
    }
}

module.exports = function(date) {
    const DATE_TIME = 'YYYY‒MM‒DD HH:SS';

    var match = date.match(regexp);
    var dateObj = new Date(
        match[1],
        match[2] - 1,
        match[3],
        match[4],
        match[5]
    );

    return {
        get value() {
            return dateObj.toString();
        },
        add: function(value, key) {
            check(value);
            chahgeDate(dateObj, value, key);
            return this;
        },
        subtract: function(value, key) {
            check(value, key);
            chahgeDate(dateObj, -1 * value, key);
            return this;
        }

    };


};
