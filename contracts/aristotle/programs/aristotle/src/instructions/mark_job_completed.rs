use crate::state::taker::*;
use crate::state::job::*;
use anchor_lang::prelude::*;

pub fn mark_job_completed(ctx: Context<MarkJobCompleted>, result_storage_id: String) -> Result<()> {
    let job = &mut ctx.accounts.job;
    let signer = &ctx.accounts.signer;
    let signer_key = signer.key();
    job.complete(result_storage_id, signer_key)
}

#[derive(Accounts)]
pub struct MarkJobCompleted<'info>{
    #[account(mut, seeds = [b"job", taker.taker_id.as_ref(), job.job_id.to_le_bytes().as_ref()], bump=job.bump)]
    pub job: Account<'info, Job>,

    #[account()]
    pub taker: Account<'info, Taker>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>
}