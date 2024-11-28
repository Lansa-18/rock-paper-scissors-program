use anchor_lang::prelude::*;
use anchor_lang::solana_program::sysvar::clock::Clock;
declare_id!("DTsqK5TEexxgu39b3NDp5pPNrjmKKZbiiBAMtujQbCL3");

#[program]
pub mod rock_paper_scissors {
    use super::*;   

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.game_account.total_games = 0;
        ctx.accounts.game_account.total_games_won = 0;
        ctx.accounts.game_account.total_games_lost = 0;
        Ok(())
    }

    pub fn start_game_session(ctx: Context<StartGame>, round: u64, unique_id: u64) -> Result<()> {
        ctx.accounts.game_session.unique_id = unique_id;
        ctx.accounts.game_session.round = round;
        ctx.accounts.game_session.results = Vec::new();
        ctx.accounts.game_session.player_score = 0;
        ctx.accounts.game_session.computer_score = 0;
        Ok(())
    }

    pub fn start_round(ctx: Context<StartRound>, player_choice: u64) -> Result<()> {
        let game_session = &mut ctx.accounts.game_session;

        if game_session.round == game_session.results.len() as u64 {
            msg!("Game Completed");
            return Ok(());
        }

        let last_round = (game_session.round - game_session.results.len() as u64) == 1;

        let clock = Clock::get().unwrap();
        let computer_choice = (clock.unix_timestamp % 3) as u64;
        let player_choice = player_choice;

        let round = Round {
            player_choice,
            computer_choice,
        };

        // Saving it into the game session result
        game_session.results.push(round);

        // PART 1
        if player_choice == computer_choice {
            ctx.accounts.game_session.player_score += 1;
            ctx.accounts.game_session.computer_score += 1;
            msg!("This is a draw!")
        } else if (player_choice == 0 && computer_choice == 2)
            || (player_choice == 1 && computer_choice == 0)
            || (player_choice == 2 && computer_choice == 1)
        {
            ctx.accounts.game_account.total_games_won += 1;
            ctx.accounts.game_session.player_score += 1;
            msg!("You won this round!")
        } else {
            ctx.accounts.game_account.total_games_lost += 1;
            ctx.accounts.game_session.computer_score += 1;
            msg!("You lost this round!")
        }

        if last_round {
            msg!("Yow won the game!")
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = signer,
        seeds = [b"gameAccount", signer.key().as_ref()], 
        bump,
        space = 8 + 8 + 8 + 8)]
    pub game_account: Account<'info, GameAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct GameAccount {
    total_games: u64,
    total_games_won: u64,
    total_games_lost: u64,
}

#[derive(Accounts)]
#[instruction(unique_id: u64)]
pub struct StartGame<'info> {
    #[account(
        init,
        seeds = [b"session", signer.key().as_ref(), &unique_id.to_le_bytes()],
        payer = signer,
        space = 8 + 8 + 8 + (8 * 4) ,
        bump
    )]
    pub game_session: Account<'info, GameSession>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StartRound<'info> {
    #[account(mut)]
    pub game_session: Account<'info, GameSession>,

    #[account(mut)]
    pub game_account: Account<'info, GameAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct GameSession {
    unique_id: u64,
    round: u64,
    results: Vec<Round>,
    player_score: u8,
    computer_score: u8,
}

#[account]
pub struct Round {
    player_choice: u64,
    computer_choice: u64,
}
// #[derive(AnchorSerialize, AnchorDeserialize, Clone)]
// pub struct Round {
//     player_choice: u64,
//     computer_choice: u64,
// }
