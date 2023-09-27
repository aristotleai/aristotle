use crate::state::provider::*;
use crate::state::taker::*;
use crate::state::job::*;
use crate::state::escrow::*;
use crate::state::server::*;
use crate::errors::DefinedError;
use anchor_lang::prelude::*;
use anchor_spl::{token::{Mint, TokenAccount, Token, Transfer, transfer}, associated_token::AssociatedToken};

pub fn assign_job(ctx: Context<AssignJob>) -> Result<()> {
    let escrow = &mut ctx.accounts.escrow;
    let taker = ctx.accounts.taker.key();
    let taker_token = ctx.accounts.taker_token.key();
    let auth_bump = *ctx.bumps.get("auth").ok_or(DefinedError::CannotGetBump)?;
    let vault_bump = *ctx.bumps.get("vault").ok_or(DefinedError::CannotGetBump)?;
    let escrow_bump = *ctx.bumps.get("escrow").ok_or(DefinedError::CannotGetBump)?;
    let job = &mut ctx.accounts.job;
    let job_id = job.job_id;
    let provider = &mut ctx.accounts.provider;
    let provider_key = provider.key();
    let server = &mut ctx.accounts.server;
    let usage_fee = server.usage_fee;

    match job.assign(provider_key) {
        Ok(_) => {
            match escrow.init(taker, taker_token, usage_fee, job_id, auth_bump, vault_bump, escrow_bump) {
                Ok(_) => {
                    let cpi_accounts = Transfer {
                        from: ctx.accounts.taker_ata.to_account_info(),
                        to: ctx.accounts.vault.to_account_info(),
                        authority: ctx.accounts.taker.to_account_info(),
                    };
                    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
                    transfer(cpi_ctx, usage_fee)?;
                    Ok(())
                },
                Err(e) => {return Err(e)}
            }
        },
        Err(e) => {return Err(e)}
    }
}

#[derive(Accounts)]
pub struct AssignJob<'info>{
    #[account(
        mut,
        associated_token::mint = taker_token,
        associated_token::authority = taker
    )]
    pub taker_ata: Account<'info, TokenAccount>,

    pub taker_token: Box<Account<'info, Mint>>,

    #[account(
        seeds = [b"auth"],
        bump
    )]
    /// CHECK: This is not dangerous because this account doesn't exist
    pub auth: UncheckedAccount<'info>,

    #[account(
        init,
        payer = taker,
        seeds = [b"vault", escrow.key().as_ref()],
        bump,
        token::mint = taker_token,
        token::authority = auth
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = taker,
        seeds = [b"escrow", taker.key().as_ref(), job.job_id.to_le_bytes().as_ref()],
        bump,
        space = Escrow::MAXIMUM_SIZE + 8
    )]
    pub escrow: Box<Account<'info, Escrow>>,

    #[account(mut, seeds = [b"job", taker.taker_id.as_ref(), job.job_id.to_le_bytes().as_ref()], bump=job.bump)]
    pub job: Account<'info, Job>,

    #[account(mut, constraint = taker.taker_id == *signer.key)]
    pub taker: Account<'info, Taker>,

    #[account(mut)]
    pub provider: Account<'info, Provider>,

    #[account(mut)]
    pub server: Account<'info, Server>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>
}