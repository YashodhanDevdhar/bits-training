let arrayLeak = [];
let arraySafe = [];

function createMemoryLeak() {
  setInterval(() => {
    arrayLeak.push(new Date());
  }, 100);
}

function createAndClearMemory() {
  setInterval(() => {
    arrayLeak.push(new Date());

    if (arrayLeak.length > 100) {
      arrayLeak.shift();
    }
  }, 100);
}

// createMemoryLeak();
createAndClearMemory();
