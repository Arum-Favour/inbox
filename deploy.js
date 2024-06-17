const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");
//updated web3 and hdwallet-provider imports added for convenience
const provider = new HDWalletProvider(
  "parrot hurry such undo kidney energy fancy sustain unfair fun stable lake",
  "https://sepolia.infura.io/v3/0357bdc24f9443b799830cce31110165"
);
// deploy code will go here
const web3 = new Web3(provider);

const deploy = async ()=>{
   const accounts = await web3.eth.getAccounts();

   console.log("Attemting to deploy from account", accounts[0]);

   const result = await new web3.eth.Contract(JSON.parse(interface))
       .deploy({data: bytecode, arguments: ['Hi there']})
       .send({gas:"1000000", from: accounts[0]});

       console.log("Contract deployed to",result.options.address);
       provider.engine.stop();
};
deploy();