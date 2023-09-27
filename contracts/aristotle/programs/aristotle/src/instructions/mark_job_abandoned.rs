use crate::state::taker::*;
use crate::state::job::*;
use crate::state::escrow::*;
use anchor_lang::prelude::*;
use anchor_spl::{token::{TokenAccount, Mint, Transfer, Token, transfer, close_account, CloseAccount}, associated_token::AssociatedToken};

pub fn mark_job_abandoned(ctx: Context<MarkJobAbandoned>) -> Result<()> {
    let job = &mut ctx.accounts.job;
    let signer = &ctx.accounts.signer;
    let signer_key = signer.key();
    job.abandon(signer_key)?;
    let signer_seeds = &[
        &b"auth"[..],
        &[ctx.accounts.escrow.auth_bump],
    ];
    // &[&[&[b"auth"[..], &self.escrow.auth_bump.to_le_bytes()]]];
    let cpi_accounts = Transfer {
        from: ctx.accounts.vault.to_account_info(),
        to: ctx.accounts.taker_ata.to_account_info(),
        authority: ctx.accounts.auth.to_account_info(),
    };
    let binding = [&signer_seeds[..]];
    let cpi_ctx = CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(), cpi_accounts, &binding);
    transfer(cpi_ctx, ctx.accounts.vault.amount)?;

    let signer_seeds_close = &[
        &b"auth"[..],
        &[ctx.accounts.escrow.auth_bump],
    ];
    let cpi_accounts_close = CloseAccount {
        account: ctx.accounts.vault.to_account_info(),
        destination: ctx.accounts.taker.to_account_info(),
        authority: ctx.accounts.auth.to_account_info(),
    };
    let binding_close = [&signer_seeds_close[..]];
    let cpi_ctx_close = CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(), cpi_accounts_close, &binding_close);
    close_account(cpi_ctx_close)
}

#[derive(Accounts)]
pub struct MarkJobAbandoned<'info>{
    #[account(
        mut,
        associated_token::mint = taker_token,
        associated_token::authority = taker
    )]
    pub taker_ata: Account<'info, TokenAccount>,

    pub taker_token: Account<'info, Mint>,

    #[account(
        seeds = [b"auth"],
        bump = escrow.auth_bump
    )]
    /// CHECK: This is not dangerous because this account doesn't exist
    pub auth: UncheckedAccount<'info>,

    #[account(
        mut,
        seeds = [b"vault", escrow.key().as_ref()],
        bump = escrow.vault_bump,
        token::mint = taker_token,
        token::authority = auth
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = escrow.server_user == taker.taker_id,
        constraint = escrow.server_user_token == taker_token.key(),
        seeds = [b"escrow", taker.key().as_ref(), escrow.seed.to_le_bytes().as_ref()],
        bump = escrow.escrow_bump,
        close = taker
    )]
    pub escrow: Box<Account<'info, Escrow>>,

    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    #[account(mut, seeds = [b"job", taker.taker_id.as_ref(), job.job_id.to_le_bytes().as_ref()], bump=job.bump)]
    pub job: Account<'info, Job>,

    #[account()]
    pub taker: Account<'info, Taker>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>
}