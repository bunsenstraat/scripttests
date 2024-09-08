import {Provider} from 'zksync-ethers';

(async () => {
    try {
  
      const zkprovider = new Provider('https://sepolia.era.zksync.dev')
      console.info(zkprovider);
      
    } catch (e) {
      console.error(e.message)
    }
  })()