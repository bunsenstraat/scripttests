import { ethers } from "ethers";



const ethers6provider = {
    async send(method: string, params: Array<any>): Promise<any> {
        try {
            const result = await remix.call('web3Provider' as any, 'sendAsync', { method, params });
            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
};
/**
 * Deploy the given contract
 * @param {string} contractName name of the contract to deploy
 * @param {Array<any>} args list of constructor's parameters
 * @param {Number} accountIndex account index from the exposed account
 * @return {Promise<ethers.Contract>} deployed contract
 */
export const deploy = async (contractName: string, args: Array<any>, accountIndex?: number): Promise<ethers.Contract> => {

    console.log(`Deploying ${contractName}`);

    // Path to the contract artifacts (modify as needed)
    const artifactsPath = `browser/contracts/artifacts/${contractName}.json`;

    // Retrieve the contract's metadata (ABI and bytecode)
    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath));

    // In ethers v6, use BrowserProvider instead of Web3Provider
    const provider = new ethers.BrowserProvider(ethers6provider);
    const signer = await provider.getSigner(accountIndex);  // In v6, this is asynchronous

    // Create a contract factory with the ABI and bytecode
    const factory = new ethers.ContractFactory(metadata.abi, metadata.data.bytecode.object, signer);

    // Deploy the contract
    const contract = await factory.deploy(...args);

    // Wait until the contract is deployed (mined)
    await contract.waitForDeployment();

    console.log(`Contract deployed at: ${contract.target}`);
    
    return contract;
};
