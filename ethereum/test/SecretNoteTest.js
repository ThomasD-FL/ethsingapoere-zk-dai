const SecretNote = artifacts.require("SecretNote");
const BN = require('bn.js');
const crypto = require('crypto');

contract('SecretNote', function(accounts) {
  it.only('createNoteDummy', async function() {
    // const e = await encrypt('2B522cABE9950D1153c26C1b399B293CaA99FcF9', '5');
    // const d = await decrypt(e);
    let instance = await SecretNote.deployed();
    let enc = await encrypt(accounts[0].slice(2), '5')
    const tx = await instance.createNoteDummy('0x5', enc);
    console.dir(tx, {depth: null});

    const noteId = tx.logs[0].args.noteId;
    const index = tx.logs[0].args.index;
    // console.log('noteId', noteId)
    
    // decrypt
    const cipher = await instance.allNotes.call(index)
    const noteHash = await decrypt(cipher);
    console.log('noteHash', noteHash)
    // check noteHash in mapping now
    const state = await instance.notes.call('0x' + noteHash)
    console.log('state', state.toNumber()) // state 1
  })
})

async function encrypt(address, _amount) {
  // 20 12
  let amount = new BN(_amount, 16).toString(16, 24); // 12 bytes = 24 chars in hex
  const payload = address + amount;
  console.log('enc payload', payload)
  const encryptedNote = await web3.eth.accounts.encrypt('0x' + payload, 'vitalik')
  return JSON.stringify(encryptedNote);
}

async function decrypt(cipher) {
  let payload = await web3.eth.accounts.decrypt(JSON.parse(cipher), 'vitalik').privateKey
  payload = payload.slice(2)
  const address = payload.slice(0, 40) // remove 0x and 
  const amount = payload.slice(40)
  console.log(address, amount);

  // pad address and amount to 32bytes
  let _address = new BN(address, 16).toString(16, 64);
  let _amount = new BN(amount, 16).toString(16, 64); // 32 bytes = 64 chars in hex
  const buf = Buffer.from(_address + _amount, 'hex');
  const digest = crypto.createHash('sha256').update(buf).digest('hex');
  return digest;
}