const ganache = require("ganache");
const { Web3 } = require("web3");
const assert = require("assert");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");
// updated ganache and web3 imports added for convenience

// contract test code will go here

// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });

let accounts;
let inbox;

beforeEach(async () => {
  //Get a List of All Accounts
  accounts = await web3.eth.getAccounts();

  //Use one of these accounts to deploy a contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there");
  });

  it('can change the message', async ()=>{
    await inbox.methods.setMessage("This is a new Message").send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message,"This is a new Message");
  });
});
