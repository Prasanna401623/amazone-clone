import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


// deliveryOptions array is assigned to objects. The objects have id, deliveryDays, and priceCents. We need to save the data deliveryDays and priceCents in our checkout page, and id helps us to differentiate between these three options(objects). 

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];


export function getDeliveryOption(deliveryOptionId){
  
  // deliveryOption is declared.
  let deliveryOption;

  // deliveryOptions array has been looped through. option parameter represents each object of deliveryOptions. If the option.id equals to deliveryOptionId, the deliverOption is assigned to option object. 
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  // returns deliveryOption (object). Default value has been assigned if there is no delivery  option chosen. The default value is the the first object of deliveryOptions array.
  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){

  // used external library to getToday's date. dayJS external library is used.
  let deliveryDate = dayjs();

  // assigning remainingDays to deliveryOption.deliveryDays. (deluveryOption is an object)
  let remainingDays = deliveryOption.deliveryDays;

  // Using while lopp to add 1 day everytime remainingDays is greater than 0.
  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    // using if statement if the deliveryDate is not sunday or not saturday, the remaining days decreases. If it is saturday or sunday, the remaning days remains the same. 
    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  // .format() helps us to format the date. The deliveryDate is formatted and assigned to dateString.
  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}

// isWeekend() function returns 'Saturday' or 'Sunday'. 
function isWeekend(date){
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

