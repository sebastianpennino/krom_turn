// Gets a random intenger between a min and a max
export const getRandomIntegerInRange = (
  min: number = 0,
  max: number
): number => {
  if (min >= max) {
    throw new Error("Invalid range: min must be less than max");
  }
  // Calculate the range
  const range = max - min + 1;
  // Generate a random integer within the range
  const randomInteger = Math.floor(Math.random() * range) + min;

  return randomInteger;
};

// A little function to helps reordering the result
// T extends any
export const reorderArray = <T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// Fake Character Card data generator
export const getFakeCharacterCardData = (count: number) => {
  return Array.from({ length: count }, (_, k) => ({
    id: `item-${(new Date().getTime()+k).toString(36)}`,
    name: `Character ${k + 1}`,
    reflexValue: getRandomIntegerInRange(1, 4),
    paPoints: 0,
    prPoints: 0,
    life: 0,
    mana: 0,
    stamina: 0,
    died: false,
    timer: 0,
    ascTimer: 0,
  }));
};

export const shuffleArray = <T>(arr: T[]): T[] => {
  const copy = [...arr];
  for (var i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
};
