const {
  createOrderRequest
} = require('./bubble_tea_order_service');
const bubbleTeaType = require('./bubble_tea_type');
const messenger = require('./bubble_tea_messenger');
const emailSpy = jest.spyOn(messenger, 'sendBubbleTeaOrderRequestEmail');

let dummyPaymentDetails;

beforeEach(() => {
  dummyPaymentDetails = {
    name: 'Sowmya',
    address: '123 Some Street',
    debitCard: {
      digits: '777777',
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test.each `
 bubbleTeaType
 ${"OOLONGMILKTEA"}
 ${"JASMINEMILKTEA"}
 ${"MATCHAMILKTEA"}
 ${"PEACHICETEA"}
 ${"LYCHEEICETEA"}
`(" test successful by passing multiple bubble tea type $bubbleTeaType  orderRequest when using spy ", ({
  bubbleTeaType
}) => {
  // arrange
  const bubbleTeaRequest = {
    paymentDetails: dummyPaymentDetails,
    bubbleTea: {
      type: bubbleTeaType
    },
  }
  //Act 
  const orderRequest = createOrderRequest(bubbleTeaRequest);

  //assert
  expect(orderRequest.name).toBe(dummyPaymentDetails.name);
  expect(orderRequest.digits).toBe(dummyPaymentDetails.debitCard.digits);
  expect(orderRequest.amount).toBe(dummyPaymentDetails.amount);
  expect(orderRequest.type).toBe(bubbleTeaType); //verified whether the bubbleTeaType in createBubbleTeaOrderRequest is passed in orderRequest

})