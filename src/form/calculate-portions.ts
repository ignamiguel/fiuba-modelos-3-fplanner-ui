const eventTypeValues = {
    workshop: 2,
    largeEvent: 6,
    wedding: 9 
  }
  
  type EventTypes = keyof typeof eventTypeValues;
  
  const calculatePortions = (totalPersons: number, eventType: keyof typeof eventTypeValues) => totalPersons * eventTypeValues[eventType];
  
  export default calculatePortions;
  
  export type {EventTypes};
  