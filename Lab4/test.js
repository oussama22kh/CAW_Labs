const {expect,  test,describe} = require( '@jest/globals');
const { default: mean } = require('../Lab3/Exo2/notation');


describe("test echo",()=>{
    test("number of times should be 10",()=>{
        let spy = jest.spyOn(console,"log")
        for(i=0;i<10;i++){
            console.log("JS from server");
            expect(spy).toHaveBeenCalled()
            }
        

    })
})
describe("mean",()=>{
    test("mean of 10,2,3,5,4 should be 4.8",()=>{
        expect(mean([10,2,3,5,4])).toBe =4.8
    })
})