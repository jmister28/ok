import * as CryptoJS from 'crypto-js';

class Block {
  public index: number; //defining index as a number
  public hash: string; //defining the hash as a string
  public previousHash: string; // defining previous hash as a string
  public timestamp: number; // defining timestamp as number
  public data: string; // defining block data as a string
  
  constructor(index: number, hash: string, previousHash: string, timestamp: number, data: string){ // constructor
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
}

const genesisBlock: Block = new Block(
  0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', '', 1465154705, 'Genesis Block Yay' 
); //define genesis block

//generate new block function
const generateNextBlock = (blockData: string) => {
  const previousBlock = getLatestBlock();
}

//end function

// Calculate current block hash using CryptoJS
const calculateHash(index: number, previousHash: string, timestamp: number, data: string): string => 
  CyptoJS.SHA256(index + previousHash + timestamp + data).toString();
//end function
