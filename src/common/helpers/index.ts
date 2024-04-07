import { IInterval } from '@@types';

export default class Helper {
  static computeElapsedTime(startDate: Date): IInterval {
    // Get the current date and time
    const currentDate: Date = new Date();

    // Calculate the difference in milliseconds
    const timeDifference: number = currentDate.getTime() - startDate.getTime();

    // Convert years, months, and days to hours
    const yearsInHours: number = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
    const monthsInHours: number = Math.floor(timeDifference / (30.44 * 24 * 60 * 60 * 1000));
    const daysInHours: number = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    // Calculate the remaining time after taking full days
    let remainingTime: number = timeDifference % (24 * 60 * 60 * 1000);

    // Calculate hours
    const realHours: number = Math.floor(remainingTime / (60 * 60 * 1000));

    // Calculate the remaining time after taking full hours
    remainingTime = remainingTime % (60 * 60 * 1000);

    // Calculate minutes
    const realMinutes: number = Math.floor(remainingTime / (60 * 1000));

    // Calculate the remaining time after taking full minutes
    remainingTime = remainingTime % (60 * 1000);

    // Calculate seconds
    const realSeconds: number = Math.floor(remainingTime / 1000);

    let hours = (yearsInHours + monthsInHours + daysInHours + realHours).toString();
    let minutes = realMinutes.toString();
    let seconds = realSeconds.toString();

    if (hours.length === 1) hours = '0' + hours;
    if (minutes.length === 1) minutes = '0' + minutes;
    if (seconds.length === 1) seconds = '0' + seconds;

    // Return the result as an object
    return {
      hours,
      minutes,
      seconds,
    };
  }
}
