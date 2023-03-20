import boxen from 'boxen';
import init from '../index.js';


export function breakTimer(minutes) {

  const milliseconds = minutes * 60 * 1000;

  setTimeout(() => {
    console.log(boxen(`Now ${minutes} minutes have passed, time to take a break!`, { padding: 1, margin: 1, borderStyle: 'double', borderColor: 'magenta' }));
    init();
  }, milliseconds);
}
