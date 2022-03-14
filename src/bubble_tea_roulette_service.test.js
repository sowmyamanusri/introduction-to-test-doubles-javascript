const getRandomBubbleTeaType = require('./bubble_tea_roulette_service');

describe("RandomBubbleTea output", () => {
  test.each `
   input | expectedOutput
   ${0.0}| ${"OOLONGMILKTEA"}
   ${0.2} |${"JASMINEMILKTEA"}
   ${0.4} | ${"MATCHAMILKTEA"}
   ${0.6} | ${"PEACHICETEA"}
   ${0.8} |${"LYCHEEICETEA"}
  `('converting randomTeaType $input to $expectedOutput', ({
    input,
    expectedOutput
  }) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(input);
    expect(getRandomBubbleTeaType()).toBe(expectedOutput);
    jest.spyOn(global.Math, 'random').mockRestore();
  })
})