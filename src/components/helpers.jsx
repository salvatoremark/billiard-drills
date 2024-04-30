export function storageAvailable(type = "localStorage") {
  try {
    var storage = window[type],
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    return false;
  }
}

export function storeObject(key, object) {
  if (storageAvailable("localStorage")) {
    localStorage.setItem(key, JSON.stringify(object));
  }
  return false;
}

export function getStoredObject(key) {
  if (storageAvailable("localStorage")) {
    return JSON.parse(localStorage.getItem(key));
  }
  return false;
}

export function getDrillScores(id) {
  const scores = getStoredObject("scores");
  if (scores !== null && Array.isArray(scores)) {
    const foundScores = scores.find((object) => object.id === id);
    if (foundScores) {
      return foundScores.scores;
    }
  }
  return [];
}

export function getAverageDrillScore(scores) {
  if (scores !== null && Array.isArray(scores) && scores.length) {
    const total = scores.reduce(
      (accumulator, item) => {
        return {
          points: accumulator.points + item.points,
          attempts: accumulator.attempts + item.attempts,
        };
      },
      { points: 0, attempts: 0 }
    );

    if (total.attempts > 0) {
      const average = total.points / total.attempts;
      return average;
    }
  } else {
    return 0;
  }
}
