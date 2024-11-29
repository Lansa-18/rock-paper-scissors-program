import * as anchor from "@coral-xyz/anchor";

export const testAccount = [103,182,68,231,90,225,133,80,98,83,109,187,7,138,212,128,255,103,12,6,240,156,207,208,248,27,100,14,204,189,161,41,151,150,242,32,131,140,93,153,250,145,44,96,7,52,233,9,157,74,179,245,6,0,102,19,33,1,158,117,214,234,108,158]

export const convertBN = (val: number) => {
    return new anchor.BN(val);
}