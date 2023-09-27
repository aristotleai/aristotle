use crate::state::taker::*;
use crate::state::job::*;
use anchor_lang::prelude::*;

pub fn report_job_ill_defined(ctx: Context<ReportJobIllDefined>) -> Result<()> {
    let job = &mut ctx.accounts.job;
    let signer = &ctx.accounts.signer;
    let signer_key = signer.key();
    job.report(signer_key)
}

#[derive(Accounts)]
pub struct ReportJobIllDefined<'info>{
    #[account(mut, seeds = [b"job", taker.taker_id.as_ref(), job.job_id.to_le_bytes().as_ref()], bump=job.bump)]
    pub job: Account<'info, Job>,

    #[account()]
    pub taker: Account<'info, Taker>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>
}