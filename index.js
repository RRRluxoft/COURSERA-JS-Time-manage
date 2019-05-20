/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    const DATE_TIME_PATTERN = 'YYYY‒MM‒DD HH:SS';
    var pattern = /(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/;
    var dateObj ;

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    Date.prototype.toString = function() {
        var date = this;
        // date.setDate(date.getDate());
        return '' + date.getFullYear() + 
        '-' + (((date.getMonth() + 1) < 10) ? '0' +(date.getMonth() + 1) : (date.getMonth() + 1))  + 
        '-' + ((date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate()) + 
        ' ' + ((date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours()) + 
        ':' + ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes());
    }

    Date.prototype.getValue = function() {
        return this.valueOf();
    }

    try {
        dateObj = stringToDate(date, pattern);
        Object.defineProperty(this, 'value', {
            value: dateObj.toString(),
            writable: true
        });
    
        // console.log('start date ' + this.value);
        
    } catch (error) {
        if(error instanceof TypeError) {
            error
        } else {
            // console.log(error.name);   
        }
    }
    
    function parseValue(val) {
        var num = parseInt(val);   
        if(isNaN(num) || num < 0) {
            throw new TypeError('Wrong value of ' + val)
        }
        return num;
    } 

    function stringToDate(_date, _pattern) {
        var arrayNumber = _date.match(_pattern);

        var year = parseValue(arrayNumber[1]);
        var month = parseValue(arrayNumber[2]);
        var day = parseValue(arrayNumber[3]);

        var hour = parseValue(arrayNumber[4]);
        var minutes = parseValue(arrayNumber[5]);
        
        var month = parseValue(month);
        month -= 1;
        return new Date(
            (year),
            month, 
            (day),
            (hour),
            (minutes)
            );
    }

    return {
        add: function (number, key) {
            switch (key) {
                case 'years':
                    dateObj.setFullYear(dateObj.getFullYear() + parseValue(number));
                    this.date = dateObj;
                    this.value = dateObj.toString();
                    break;

                case 'months':
                    var newDate = new Date(dateObj.valueOf());
                    newDate.setMonth(newDate.getMonth() + parseValue(number));
                    dateObj = newDate;
                    this.date = dateObj;
                    this.value = dateObj.toString();
                    break;

                case 'days':
                    var newDate = dateObj;
                    newDate.setTime(newDate.getTime() + (parseValue(number) * 24 * 60 * 60 * 1000));
                    dateObj = newDate;
                    // console.log('days added ' + dateObj); 
                    this.value = dateObj.toString();
                    this.date = dateObj;
                    // console.log('days added ' + this); 
                    break;

                case 'hours':
                var newDate = dateObj;
                newDate.setTime(newDate.getTime() + (parseValue(number) * 60 * 60 * 1000));
                dateObj = new Date(newDate);
                // console.log(number + ' hours added ' + dateObj); 
                this.value = dateObj.toString();
                this.date = dateObj;
                break;

                case 'minutes':
                var newDate = dateObj;
                newDate.setTime(newDate.getTime() + (parseValue(number) * 60 * 1000));
                dateObj = newDate;
                // console.log('minutes added ' + dateObj);
                this.date = dateObj;
                this.value = dateObj.toString();
                break;
            
                default:
                    throw new TypeError('Type missing') ;
            }
            
            return this;
        },
        subtract: function (number, key) {
            switch (key) {
                case 'years':
                dateObj.setFullYear(dateObj.getFullYear() - parseValue(number));
                this.date = dateObj;
                this.value = dateObj.toString();
                break;

                case 'months':
                    var newDate = dateObj;
                    newDate.setMonth(newDate.getMonth() - parseValue(number));                    
                    dateObj = newDate;
                    this.date = dateObj;
                    // console.log(number + ' months subtracted ' + this.date);
                    // console.log('\t months subtracted value >>>>> ' + dateObj.value); 
                    this.value = dateObj.toString();
                    break;

                case 'days':
                dateObj = dateObj.addDays(-parseValue(number));
                this.date = dateObj;
                this.value = dateObj.toString();
                break;

                case 'hours':
                var newDate = dateObj;
                newDate.setTime(newDate.getTime() - (parseValue(number) * 60 * 60 * 1000));
                dateObj = newDate;
                this.date = dateObj;
                this.value = dateObj.toString();
                break;

                case 'minutes':
                var newDate = dateObj;
                newDate.setTime(newDate.getTime() - (parseValue(number) * 60 * 1000));
                dateObj = newDate;
                this.date = dateObj;
                this.value = dateObj.toString();
                break;
            
                default:
                    throw new TypeError('Type missing') ;
            }
            return this;
        }
    }
};
