import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { RockPaperScissors } from "../target/types/rock_paper_scissors";
import { convertBN, testAccount } from "./test";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";

describe("rock_paper_scissors", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
  
  const program = anchor.workspace.RockPaperScissors as Program<RockPaperScissors>;
  const newKeyPair = anchor.web3.Keypair.fromSecretKey(new Uint8Array(testAccount));

  const pg = new anchor.web3.PublicKey(program.programId);

  // it("Is initialized!", async () => {
  //   // Add your test here.
  //   const [RockPaperScissorsPDA, rpsBump] = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from("gameAccount"), newKeyPair.publicKey.toBuffer()],
  //     program.programId
  //   );
  //   const tx = await program.methods.initialize().accountsPartial({
  //     gameAccount: RockPaperScissorsPDA,
  //     signer: newKeyPair.publicKey,
  //     systemProgram: SYSTEM_PROGRAM_ID
  //   })
  //     .signers([newKeyPair])
  //   .rpc();
  //   console.log("Your transaction signature", tx);
  // });

  // it("It starts a game!", async () => {

  //     // Add your test here.
  //   // const [RockPaperScissorsPDA, rpsBump] = await anchor.web3.PublicKey.findProgramAddress(
  //   //   [Buffer.from("gameAccount"), newKeyPair.publicKey.toBuffer()],
  //   //   program.programId
  //   // );

  //   const uniqueId = 1234567;
  //   const uniqueIdBuffer = Buffer.alloc(8);
  //   uniqueIdBuffer.writeUInt32LE(uniqueId, 0);

  //   //gamesession pda
  //   const [gameSesPDA, gameSesBump] = anchor.web3.PublicKey.findProgramAddressSync(
  //     [Buffer.from("session"), newKeyPair.publicKey.toBuffer(), uniqueIdBuffer],
  //       program.programId
  //     );

  //   // // E3jGPMt7HVcoUYuFLLJ9eYXQhCN57hgzeBa3mQLxwvvt
  //   const tx = await program.methods.startGameSession(convertBN(uniqueId), convertBN(3)).accountsPartial({
  //     gameSession: gameSesPDA,
  //     signer: newKeyPair.publicKey,
  //     systemProgram: SYSTEM_PROGRAM_ID
  //     })
  //     .signers([newKeyPair])
  //     .rpc();
  //     console.log("Your transaction signature", tx);

  //   let sessionCreated = await program.account.gameSession.fetch(gameSesPDA)

  //   console.log("uniqueId", sessionCreated.uniqueId.toString());
  //   console.log("computerScore", sessionCreated.computerScore.toString());
  //   console.log("rounds", sessionCreated.results);

  //   });


  it("It starts a game round!", async () => {

    // Add your test here.
    const [RockPaperScissorsPDA, rpsBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("gameAccount"), newKeyPair.publicKey.toBuffer()],
      program.programId
    );

    const uniqueId = 1234567;
    const uniqueIdBuffer = Buffer.alloc(8);
    uniqueIdBuffer.writeUInt32LE(uniqueId, 0);

    //gamesession pda
    const [gameSesPDA, gameSesBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("session"), newKeyPair.publicKey.toBuffer(), uniqueIdBuffer],
      program.programId
    );

    let playerChoice = 0;
    const tx = await program.methods.startRound(convertBN(playerChoice)).accountsPartial({
      gameSession: gameSesPDA,
      gameAccount: RockPaperScissorsPDA,
      signer: newKeyPair.publicKey,
      systemProgram: SYSTEM_PROGRAM_ID
      })
      .signers([newKeyPair])
      .rpc();
      console.log("Your transaction signature", tx);

    let gamePlayed = await program.account.gameAccount.fetch(RockPaperScissorsPDA)
    let sessionStatus = await program.account.gameSession.fetch(gameSesPDA)

    //if the result has increased
    console.log("rounds", sessionStatus.results);
    console.log("playerScore", sessionStatus.playerScore.toString());
    console.log("computerScore", sessionStatus.computerScore.toString());



    //if the game played was recored in the gameAccount
    console.log("totalGamesWon", gamePlayed.totalGamesWon.toString());
    console.log("totalGamesLost", gamePlayed.totalGamesLost.toString());



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




