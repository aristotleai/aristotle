use crate::state::taker::*;
use crate::state::job::*;
use anchor_lang::prelude::*;
use crate::errors::DefinedError;

pub fn create_job(ctx: Context<CreateJob>, job_id: u64, name: String, description: String, storage_id: String, req_memory: u32, req_cores: u8, req_bandwidth: u32, req_server_time: u32) -> Result<()> {
    let job = &mut ctx.accounts.job;
    let taker = &ctx.accounts.taker;
    let taker_key = taker.key();
    let bump = *ctx.bumps.get("job").ok_or(DefinedError::CannotGetBump)?;

    job.create(job_id, taker_key, name, description, storage_id, req_memory, req_cores, req_bandwidth, req_server_time, bump)
}

#[derive(Accounts)]
#[instruction(job_id: u64)]
pub struct CreateJob<'info>{
    #[account(init, payer = signer, space = Job::MAXIMUM_SIZE + 8, seeds = [b"job", taker.taker_id.as_ref(), job_id.to_le_bytes().as_ref()], bump)]
    pub job: Account<'info, Job>,

    #[account(constraint = taker.taker_id == *signer.key)]
    pub taker: Account<'info, Taker>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>
}