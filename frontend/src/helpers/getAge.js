const getAge =  (birthDate, ageAtDate) => {
    var daysInMonth = 30.436875; // Days in a month on average.
    var dob = new Date(birthDate);
    var aad;
    if (!ageAtDate) aad = new Date();
    else aad = new Date(ageAtDate);
    var yearAad = aad.getFullYear();
    var yearDob = dob.getFullYear();
    var years = yearAad - yearDob; // Get age in years.
    dob.setFullYear(yearAad); // Set birthday for this year.
    var aadMillis = aad.getTime();
    var dobMillis = dob.getTime();
    if (aadMillis < dobMillis) {
      --years;
      dob.setFullYear(yearAad - 1); // Set to previous year's birthday
      dobMillis = dob.getTime();
    }
    var days = (aadMillis - dobMillis) / 86400000;
    var monthsDec = days / daysInMonth; // Months with remainder.
    var months = Math.floor(monthsDec); // Remove fraction from month.
    days = Math.floor(daysInMonth * (monthsDec - months));
    const yearStr = (years>1?`${years} years `: `${years} year `)
    const monthStr = (months>1?`${months} months `: ` ${months} month `)
    const dayStr = (days>1?`${days} days `: ` ${days} day `)
    const ageStr = `${yearStr}${monthStr}${dayStr} old`
    // return (`${years} ${months} ${years}`) { years: years, months: months, days: days };
    return (ageStr);
  }

  export default getAge;