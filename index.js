/* Your Code Here */
function createEmployeeRecord(employee){
    const employeeRecord = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord;
}

function createEmployeeRecords(employee){
    return employee.map(function (record) { 
        return createEmployeeRecord(record)
    });
}

function createTimeInEvent(dateStamp){
    const [date, hour] = dateStamp.split(` `);
    const inEvent = {
        type: "TimeIn",
        hour: parseFloat(hour),
        date: date,
    }
    this.timeInEvents.push(inEvent);
    return this;
}

function createTimeOutEvent(dateStamp){
    const [date, hour] = dateStamp.split(` `);
    const outEvent = {
        type: "TimeOut",
        hour: parseFloat(hour),
        date: date,
    }
    this.timeOutEvents.push(outEvent);
    return this;
}

function hoursWorkedOnDate(date){
    const inEvent = this.timeInEvents.find(function (inEvent){
         return inEvent.date === date;
        });
    const outEvent = this.timeOutEvents.find(function (outEvent){
        return outEvent.date === date;
    });
    return (outEvent.hour - inEvent.hour)/100;
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this,date)*this.payPerHour;
}

function findEmployeeByFirstName(employeeRecord, name){
    return employeeRecord.find(function (e) {
        return e.firstName === name;
    })
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(arr){
    let total = 0;
    arr.forEach(function (employeeRecord){
        return total = total + allWagesFor.call(employeeRecord);
    })
    return total;
}