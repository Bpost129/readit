const clock = document.querySelectorAll('.time')

function calculateTime(created) {
  let time = Date.parse(created);
  let now = Date.now();
  let secondsPast = (now - time) / 1000;
  let suffix = 'ago';

  let intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (let i in intervals) {
    let interval = intervals[i];
      if (secondsPast >= interval) {
        let count = Math.floor(secondsPast / interval);
        return `${count} ${i} ${count > 1 ? 's' : ''} ${suffix}`;
      }
  }
}

