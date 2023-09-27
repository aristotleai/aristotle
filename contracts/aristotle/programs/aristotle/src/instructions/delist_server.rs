use crate::state::provider::*;
use crate::state::server::*;
use anchor_lang::prelude::*;

pub fn delist_server(ctx: Context<DelistServer>) -> Result<()> {
    let server = &mut ctx.accounts.server;
    server.delist()
}

#[derive(Accounts)]
pub struct DelistServer<'info>{
    #[account(mut, seeds = [b"server", provider.provider_id.as_ref(), server.server_id.to_le_bytes().as_ref()], bump=server.bump)]
    pub server: Account<'info, Server>,

    #[account(constraint = provider.provider_id == *signer.key)]
    pub provider: Account<'info, Provider>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>
}