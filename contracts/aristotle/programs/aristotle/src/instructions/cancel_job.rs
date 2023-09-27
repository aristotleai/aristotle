use crate::state::taker::*;
use crate::state::job::*;
use anchor_lang::prelude::*;

pub fn cancel_job(ctx: Context<CancelJob>) -> Result<()> {
    let job = &mut ctx.accounts.job;

    job.cancel()
}

#[derive(Accounts)]
pub struct CancelJob<'info>{
    #[account(mut, seeds = [b"job", taker.taker_id.as_ref(), job.job_id.to_le_bytes().as_ref()], bump=job.bump)]
    pub job: Account<'info, Job>,

    #[account(constraint = taker.taker_id == *signer.key)]
    pub taker: Account<'info, Taker>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>
}