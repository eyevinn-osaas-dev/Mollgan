import { breakTimer } from "./features/breakTimer.js";
import fs from 'fs';
import readline from 'readline';

const config = JSON.parse(fs.readFileSync('./mollgan.config.json'));
const terminal = readline.createInterface({ // Skapa en instans av readline.Interface
  input: process.stdin,
  output: process.stdout
});

// Hämta argumenten från process.argv
const args = process.argv.slice(2);

// Loopa igenom argumenten och uppdatera inställningarna
args.forEach(arg => {
  const [key, value] = arg.split('=');
  if (key in config) {
    config[key] = value;
  }
});

export default function init() {
  let duration = config.breakTimer; // Hämta värde på breakeTimer prop i config-fil.
  duration = 30;

  // Läs in duration från terminalen
  terminal.question(`How long work interval do you want(in minutes)? (current: ${duration} minutes): `, answer => {
    const newDuration = parseInt(answer, 10); // Konvertera svaret till en siffra

    // Uppdatera breakTimer värdet i config.
    if (newDuration == !null) {
      config.breakTimer = newDuration;
      fs.writeFileSync('./mollgan.config.json', JSON.stringify(config, null, 2));
    } else {
      console.log('Needs to be a number and 1 or higher');
      init();
    }

    console.log(`${newDuration} minutes until your break`)
    // Starta breakTimer med det nya värdet.
    breakTimer(config.breakTimer);
  });
}






// function init() {
//   breakTimer(config.breakTimer);
// }

init();