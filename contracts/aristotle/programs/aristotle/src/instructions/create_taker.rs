use crate::state::taker::*;
use anchor_lang::prelude::*;

pub fn create_taker(ctx: Context<CreateTaker>, name: String) -> Result<()> {
    let taker = &mut ctx.accounts.taker;
    let taker_key = taker.key();
    taker.create(taker_key, name)
}

#[derive(Accounts)]
pub struct CreateTaker<'info>{
    #[account(init, payer = signer, space = 8 + Taker::MAXIMUM_SIZE)]
    pub taker: Account<'info, Taker>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>
}