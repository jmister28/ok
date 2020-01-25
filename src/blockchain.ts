import * as CryptoJS from 'crypto-js';
import {broadcastLatest} from './p2p';


class Block {
  public index: number; //defining index as a number
  public hash: string; //defining the hash as a string
  public previousHash: string; // defining previous hash as a string
  public timestamp: number; // defining timestamp as number
  public data: string; // defining block data as a string
  public difficulty: number;
  public nonce: number;
  
  constructor(index: number, hash: string, previousHash: string, timestamp: number, data: string, difficulty: number, nonce: number){ // constructor
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}

const genesisBlock: Block = new Block(
  0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', '', 1465154705, 'Genesis Block Yay' 
); //define genesis block

//define blockchain as array
const blockchain: Block[] = [genesisBlock];

//generate new block function
const generateNextBlock = (blockData: string) => {
  const previousBlock: Block = getLatestBlock(); // most recent block before the one we are about to create
  const nextIndex: number = previousBlock.index + 1;
  const nextTimestamp: number = new Date().getTime() / 1000;
  const nextHash: string = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
  const newBlock: Block = new Block(nextIndex, nextHash, previousBlock.hash, nextTimestamp, blockData);
  return newBlock;
}
//end function

// Calculate current block hash using CryptoJS
const calculateHash(index: number, previousHash: string, timestamp: number, data: string): string => 
  CyptoJS.SHA256(index + previousHash + timestamp + data).toString();
//end function

//validate blocks
const isValidNewBlock = (newBlock: Block, previousBlock: Block) => {
  if (previousBlock.index + 1 !== newBlock.index){
    console.log('invalid index');
    return false;
  } else if(previousBlock.hash !== newBlock.previousHash){
    console.log('Hash of previous block does not match record in current block. Invalid.");
    return false;
  }else if(calculateHashForBlock(newBlock) !== newBlock.hash){
      console.log('Hash has been changed. Invalid');
      return false;
  }
  return true;
};
//end function
  
// hash matches difficulty or not
const hashMatchesDifficulty = (hash: string, difficulty: number): boolean =>{
  const hashInBinary: string = hexToBinary(hash);
  const requiredPrefix: string = '0'.repeat(difficulty);
  return hashInBinary.startsWith(requiredPrefix);
}
//end function
  
// validate block structure
const isValidBlockStructure = (block: Block): boolean => {
  return typeof block.index === 'number'
      && typeof block.hash === 'string'
      && typeof block.previousHash === 'string'
      && typeof block.timestamp === 'number'
      && typeof block.data === 'string';
};
// end function

//verify chain
const isValidChain = (blockchainToValidate: Block[]): boolean =>{
  const isValidGenesis = (block: Block): boolean => {
    return JSON.stringify(block) === JSON.stringify(genesisBlock);
  };
  if(!isValidGenesis(blockchainToValidate[0])){
    return false;
  }
  for(let i = 1; i < blockchainToValidate.length; i++){
    if(!isValidNewBlock(blockchainToValidate[i), blockchainToValidate[i-1])){
      return false;
    }
  }
  
  return true;
};
// end function
  
// chain replacing function in case of node dissagreement
const replaceChain = (newBlocks: Blocks[]) =>{
  if(isValidChain(newBlocks) && newBlocks.length > getBlockchain().length) {
    console.log('Submitted Blockchain is valid, Replacing old blockchain with new blocks');
    blockchain = newBlocks;
    broadcastLatest;
  } else {
    console.log('Submitted Blockchain is INVALID. Cannot Replace");
  }
}
