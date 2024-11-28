import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { RockPaperScissors } from "../target/types/rock_paper_scissors";
import {testAccount} from "./test";


describe("rock_paper_scissors", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
  
    const program = anchor.workspace.Check as Program<RockPaperScissors>;
    const newKeyPair = anchor.web3.Keypair.fromSeed(new Uint8Array(testAccount)); 

  
    it("Is initialized!", async () => {
      // Add your test here.
      const [RockPaperScissorsPDA, rpsBump] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("game_pass"), pg.publicKey.toBuffer()],
        program.programId
      );

      const tx = await program.methods.initialize(

      ).accounts({
        gameAccount: "",
        signer: newKeyPair.publicKey,
      })
      .rpc();
      console.log("Your transaction signature", tx);
    });
  });




















// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { RockPaperScissors } from "../target/types/rock_paper_scissors";
// import {assert} from "chai";


// describe('rock_paper_scissors', () => {
//   // Configure the client to use the local cluster.
//   const provider = anchor.AnchorProvider.env();
//   anchor.setProvider(provider);

//   const program = anchor.workspace.RockPaperScissors as Program<RockPaperScissors>;

//   let gameAccount = anchor.web3.Keypair.generate();
//   let gameSession = anchor.web3.Keypair.generate();
//   let uniqueId = new anchor.BN(Date.now());

//   it('Initializes the game account', async () => {
//       await program.methods.initialize()
//           .accounts({
//               gameAccount: gameAccount.publicKey,
//               signer: provider.wallet.publicKey,
//               system_program: anchor.web3.SystemProgram.programId,
//           })
//           .signers([gameAccount])
//           .rpc();

//       const account = await program.account.gameAccount.fetch(gameAccount.publicKey);
//       assert.equal(account.totalGames.toNumber(), 0);
//       assert.equal(account.totalGamesWon.toNumber(), 0);
//       assert.equal(account.totalGamesLost.toNumber(), 0);
//   });

//   it('Starts a new game session', async () => {
//       await program.methods.startGameSession(new anchor.BN(3), uniqueId)
//           .accounts({
//               game_session: gameSession.publicKey,
//               signer: provider.wallet.publicKey,
//               system_program: anchor.web3.SystemProgram.programId,
//           })
//           .signers([gameSession])
//           .rpc();

//       const session = await program.account.gameSession.fetch(gameSession.publicKey);
//       assert.equal(session.uniqueId.toString(), uniqueId.toString());
//       assert.equal(session.round.toNumber(), 3);
//       assert.equal(session.results.length, 0);
//       assert.equal(session.playerScore, 0);
//       assert.equal(session.computerScore, 0);
//   });

//   it('Plays a round and wins', async () => {
//       await program.methods.startRound(new anchor.BN(1)) // Player chooses paper
//           .accounts({
//               gameSession: gameSession.publicKey,
//               gameAccount: gameAccount.publicKey,
//               signer: provider.wallet.publicKey,
//               system_program: anchor.web3.SystemProgram.programId,
//           })
//           .rpc();

//       const session = await program.account.gameSession.fetch(gameSession.publicKey);
//       const account = await program.account.gameAccount.fetch(gameAccount.publicKey);

//       assert.equal(session.results.length, 1);
//       assert.equal(session.playerScore, 1);
//       assert.equal(session.computerScore, 0);
//       assert.equal(account.totalGamesWon.toNumber(), 1);
//   });

//   it('Plays a round and loses', async () => {
//       await program.methods.startRound(new anchor.BN(0)) // Player chooses rock
//           .accounts({
//               gameSession: gameSession.publicKey,
//               gameAccount: gameAccount.publicKey,
//               signer: provider.wallet.publicKey,
//               system_program: anchor.web3.SystemProgram.programId,
//           })
//           .rpc();

//       const session = await program.account.gameSession.fetch(gameSession.publicKey);
//       const account = await program.account.gameAccount.fetch(gameAccount.publicKey);

//       assert.equal(session.results.length, 2);
//       assert.equal(session.playerScore, 1);
//       assert.equal(session.computerScore, 1);
//       assert.equal(account.totalGamesLost.toNumber(), 1);
//   });

//   it('Plays a round and draws', async () => {
//       await program.methods.startRound(new anchor.BN(2)) // Player chooses scissors
//           .accounts({
//               gameSession: gameSession.publicKey,
//               gameAccount: gameAccount.publicKey,
//               signer: provider.wallet.publicKey,
//               system_program: anchor.web3.SystemProgram.programId,
//           })
//           .rpc();

//       const session = await program.account.gameSession.fetch(gameSession.publicKey);
//       const account = await program.account.gameAccount.fetch(gameAccount.publicKey);

//       assert.equal(session.results.length, 3);
//       assert.equal(session.playerScore, 2);
//       assert.equal(session.computerScore, 2);
//       assert.equal(account.totalGamesWon.toNumber(), 1);
//       assert.equal(account.totalGamesLost.toNumber(), 1);
//   });

//   it('Fails to play a round after game completion', async () => {
//       try {
//           await program.methods.startRound(new anchor.BN(1)) // Player chooses paper
//               .accounts({
//                   gameSession: gameSession.publicKey,
//                   gameAccount: gameAccount.publicKey,
//                   signer: provider.wallet.publicKey,
//                   system_program: anchor.web3.SystemProgram.programId,
//                 })
//               .rpc();
//           assert.fail('The transaction should have failed');
//       } catch (err) {
//           assert.equal(err.message, 'Game Completed');
//       }
//   });
// });




