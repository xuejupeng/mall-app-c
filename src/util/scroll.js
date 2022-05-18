export default function moveTo(start, end, wap, direction) {
  let dis = 0;
  let speed = 5;
  if (end < 0) {
    speed *= -1;
  }
  const timer = setInterval(() => {
    dis += speed;
    // eslint-disable-next-line no-param-reassign
    wap[direction] = start + dis;
    if (Math.abs(dis) > Math.abs(end)) {
      // eslint-disable-next-line no-param-reassign
      wap[direction] = start + end;
      clearInterval(timer);
    }
  }, 2);
}
